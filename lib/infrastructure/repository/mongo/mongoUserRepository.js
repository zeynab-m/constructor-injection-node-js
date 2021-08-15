'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer,validator,userCollection}= require('../../orm/mongo/migrations')

module.exports = class extends userRepository {

    constructor(userEntity) {
        super()
        this.userEntity=userEntity
        this.collection='users'
        this.create=this.create.bind(this)
        this.findUserByUserName=this.findUserByUserName.bind(this)

    }

    async create(userData,dbName) {


        let userSchema =await mongo().collection(dbName,this.collection)
        let user =  validator({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName,
            password: userData.password,
            roles: userData.roles,
            salt: userData.salt,
            deletedAt: userData.deletedAt,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        },userCollection)
        return userSchema.update({userName:user.userName},[{
            $set: {
                id: {$cond:[ { $not: ["$id"] }, userData.id, "$id" ]},
                firstName: userData.firstName,
                lastName: userData.lastName,
                userName: userData.userName,
                password: userData.password,
                roles: userData.roles,
                salt: userData.salt,
                deletedAt: userData.deletedAt,
                createdAt: {$cond: [{ $not: ["$createdAt"] }, userData.createdAt, "$createdAt"]},
                updatedAt: {$cond: [{ $not: ["$updatedAt"] } ,userData.updatedAt, "$updatedAt"]},


            }
        }],
            {upsert:true})



    }

    async findUserByUserName(userName,dbName) {


        let userSchema =await mongo().collection(dbName,this.collection)
        let user=await userSchema.findOne({userName:userName})
        user=serializer(user,'user')
        return user



    }

}
