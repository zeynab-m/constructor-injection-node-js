'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')

module.exports = class extends userRepository {

    constructor(userEntity) {
        super()
        this.userEntity=userEntity
        this.collection='users'
        this.create=this.create.bind(this)

    }

    async create(userData,dbName) {


        let userSchema =await mongo().collection(dbName,this.collection)
        let user = await this.userEntity.setUser(userData)
        return userSchema.update({userName:user.userName},{$set:user},{upsert:true})



    }

    async findUserByUserName(userName,dbName) {


        let userSchema =await mongo().collection(dbName,this.collection)
        return userSchema.findOne({userName:userName})



    }

}
