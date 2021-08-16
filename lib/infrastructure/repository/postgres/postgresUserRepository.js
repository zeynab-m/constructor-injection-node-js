'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const postgres = require('../../orm/postgres/knexConnection')
let userRolRepository = require('../../repository/postgres/postgresUserRolRepository')
userRolRepository=new userRolRepository()
module.exports = class extends userRepository {

    constructor(userEntity) {
        super()
        this.userEntity=userEntity
        this.table='users'
        this.create=this.create.bind(this)

    }

    async create(user,dbName) {

        let userConnection =await postgres().getConnection(dbName)
        await userConnection(this.table).insert({
            'id':user.id,
            'firstName':user.firstName,
            'lastName':user.lastName,
            'userName':user.userName,
            'password':user.password,
            'salt':user.salt,
            'deletedAt':user.deletedAt,
            'createdAt':user.createdAt,
            'updatedAt':user.updatedAt,
        })
            .onConflict('userName')
            .ignore()
        let userData = await userConnection(this.table)
            .where({
                userName: user.userName
            }).select('id')
        await this.createUserRoles({id:userData[0].id,roles:user.roles,dbName})
        return true




    }

    async findUserByUserName(userName,dbName) {

        let userConnection =await postgres().getConnection(dbName)
        let user= await userConnection(this.table)
            .where({userName:userName})
            .select('*')
        return user[0]



    }
    async createUserRoles({id,roles,dbName}) {

        for await(let role of roles){

            await userRolRepository.create({
                userId:id,
                roleId:role,
                createdAt:new Date().toISOString(),
                updatedAt:new Date().toISOString()
            },dbName)
        }
        return true


    }

}
