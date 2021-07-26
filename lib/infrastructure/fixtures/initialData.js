let diContainer= require('../../interface/DI/createContainer')
const config = require('../orm/mongo/config')
const userRepository= diContainer.get('userRepository')
const permissionRepository= diContainer.get('permissionRepository')
const roleRepository= diContainer.get('roleRepository')
const objects=['zone','user','point','role','permission']
const actions=['read','update','create','list']

const permissions=[
    { object: 'zone', action: 'read' },
    { object: 'zone', action: 'update' },
    { object: 'zone', action: 'create' },
    { object: 'zone', action: 'list' },
    { object: 'user', action: 'read' },
    { object: 'user', action: 'update' },
    { object: 'user', action: 'create' },
    { object: 'user', action: 'list' },
    { object: 'point', action: 'read' },
    { object: 'point', action: 'update' },
    { object: 'point', action: 'create' },
    { object: 'point', action: 'list' },
    { object: 'role', action: 'read' },
    { object: 'role', action: 'update' },
    { object: 'role', action: 'create' },
    { object: 'role', action: 'list' },
    { object: 'permission', action: 'read' },
    { object: 'permission', action: 'update' },
    { object: 'permission', action: 'create' },
    { object: 'permission', action: 'list' },
    { object: 'home', action: 'read' },
]

function generatePermissions(){
    for (const obj of objects){
        for (const act of actions){

            permissions.push({object:obj,action:act})
        }
    }
}

module.exports=()=>{

    return {

        init
    }
    async function init(){

        await permissionRepository.bulkUpdate(permissions,config.dbName)

        let supperAdmin={

            title:'supperAdmin',
            permissions,
        }
        await  roleRepository.create(supperAdmin,config.dbName)
        let role=await roleRepository.findByTitle('supperAdmin',config.dbName)

        let defaultUser={

            firstName:'default',
            lastName:'defaultUser',
            userName:'default_admin',
            password:'123456',
            roles:[role._id],

        }

        let user=userRepository.create(defaultUser,config.dbName)

        return (user)




    }



}

