let diContainer= require('../../interface/DI/createContainer')
const config = require('../orm/mongo/config')
const userRepository= diContainer.get('userRepository')
const permissionRepository= diContainer.get('permissionRepository')
const permissionEntity= diContainer.get('permissionEntity')
const roleEntity= diContainer.get('roleEntity')
const userEntity= diContainer.get('userEntity')
const roleRepository= diContainer.get('roleRepository')
const objects=['zone','user','point','role','permission']
const actions=['read','update','create','list']

let permissions=[
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

        permissions=permissions.map(per=>{
             return  permissionEntity.setPermission(per)

        })

        await permissionRepository.bulkUpdate(permissions,'location_db')
        let permissionsId=await permissionRepository.read(config.dbName)
        permissionsId= permissionsId.map(per=> {
            return per.id
        })


        let supperAdmin= roleEntity.setRole({title:'supperAdmin',permissions:permissionsId})
        await  roleRepository.create(supperAdmin,config.dbName)
        let role=await roleRepository.findByTitle('supperAdmin',config.dbName)

        let defaultUser=await userEntity.setUser({

            firstName:'default',
            lastName:'defaultUser',
            userName:'default_admin',
            password:'123456',
            roles:[ role.id],

        })

        let user=userRepository.create(defaultUser,config.dbName)

        return (user)




    }



}

