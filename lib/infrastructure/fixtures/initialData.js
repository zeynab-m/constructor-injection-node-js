let diContainer= require('../../interface/DI/createContainer')
const config = require('../orm/mongo/config')
const userRepository= diContainer.get('userRepository')
const permissionRepository= diContainer.get('permissionRepository')
const permissionEntity= diContainer.get('permissionEntity')
const roleEntity= diContainer.get('roleEntity')
const userEntity= diContainer.get('userEntity')
const cryptoHandler= diContainer.get('cryptoHandler')
const roleRepository= diContainer.get('roleRepository')
const objects=['zone','user','point','role','permission']
const actions=['read','update','create','list']

let defaultPermissions=[
    { id:cryptoHandler.uuidGenerator(), object: 'zone', action: 'read' },
    { id:cryptoHandler.uuidGenerator(),object: 'zone', action: 'update' },
    { id:cryptoHandler.uuidGenerator(),object: 'zone', action: 'create' },
    { id:cryptoHandler.uuidGenerator(),object: 'zone', action: 'list' },
    { id:cryptoHandler.uuidGenerator(),object: 'user', action: 'read' },
    { id:cryptoHandler.uuidGenerator(),object: 'user', action: 'update' },
    { id:cryptoHandler.uuidGenerator(),object: 'user', action: 'create' },
    { id:cryptoHandler.uuidGenerator(),object: 'user', action: 'list' },
    { id:cryptoHandler.uuidGenerator(),object: 'point', action: 'read' },
    { id:cryptoHandler.uuidGenerator(),object: 'point', action: 'update' },
    { id:cryptoHandler.uuidGenerator(),object: 'point', action: 'create' },
    {id:cryptoHandler.uuidGenerator(), object: 'point', action: 'list' },
    { id:cryptoHandler.uuidGenerator(),object: 'role', action: 'read' },
    { id:cryptoHandler.uuidGenerator(),object: 'role', action: 'update' },
    {id:cryptoHandler.uuidGenerator(), object: 'role', action: 'create' },
    {id:cryptoHandler.uuidGenerator(), object: 'role', action: 'list' },
    { id:cryptoHandler.uuidGenerator(),object: 'permission', action: 'read' },
    {id:cryptoHandler.uuidGenerator(), object: 'permission', action: 'update' },
    { id:cryptoHandler.uuidGenerator(),object: 'permission', action: 'create' },
    {id:cryptoHandler.uuidGenerator(), object: 'permission', action: 'list' },
    {id:cryptoHandler.uuidGenerator(), object: 'home', action: 'read' },
]

function generatePermissions(){
    for (const obj of objects){
        for (const act of actions){

            defaultPermissions.push({object:obj,action:act})
        }
    }
}

module.exports=()=>{

    return {

        init
    }
    async function init(){

        let permissions=[]
        for (const per of defaultPermissions) {
            permissions.push(await permissionEntity.setPermission(per))
        }

        await permissionRepository.bulkUpdate(permissions,'location_db')
        let permissionsId=await permissionRepository.read(config.dbName)
        permissionsId= permissionsId.map(per=> {
            return per.id
        })


        let supperAdmin=await roleEntity.setRole({id:cryptoHandler.uuidGenerator(),title:'supperAdmin',permissions:permissionsId})
        await  roleRepository.create(supperAdmin,config.dbName)
        let role=await roleRepository.findByTitle('supperAdmin',config.dbName)

        let defaultUser=await userEntity.setUser({

            id:cryptoHandler.uuidGenerator(),
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

