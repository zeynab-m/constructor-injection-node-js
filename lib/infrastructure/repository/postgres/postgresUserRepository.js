'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const postgres = require('../../orm/postgres/knexConnection')
const { randomUUID } = require('crypto');
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

        console.log({user})
        let userConnection =await postgres().getConnection(dbName)
        await userConnection(this.table).insert({
            'id':randomUUID(),
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
            .where({userName:user.userName})
            .select('id')
        console.log({userData})
        let createUserRoles = await this.createUserRoles({id:userData[0].id,roles:user.roles,dbName})
        console.log({createUserRoles,userData})
        return true




    }

    async findUserByUserName(userName,dbName) {


        let userSchema =await mongo().table(dbName,this.table)
        return userSchema.findOne({userName:userName})



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
