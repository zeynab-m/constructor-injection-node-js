'use strict';
const roleRepository = require('../../../application/domain/user/role/roleRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {ObjectId} = require('../../orm/mongo/mongoDriver')()

module.exports = class extends roleRepository {

    constructor(roleEntity) {
        super()
        this.roleEntity=roleEntity
        this.collection='roles'
        this.create=this.create.bind(this)
        this.findByTitle=this.findByTitle.bind(this)
        this.getUserRoles=this.getUserRoles.bind(this)
    }
    async create(roleData,dbName) {


        let roleSchema =await mongo().collection(dbName,this.collection)
        let role = await this.roleEntity.setRole(roleData)
        return roleSchema.update({title:role.title},{$set: role},{upsert:true})



    }
    async findByTitle(title,dbName) {


        let roleSchema =await mongo().collection(dbName,this.collection)
        return roleSchema.findOne({title})



    }
    async getUserRoles(roles,dbName) {


        let roleSchema =await mongo().collection(dbName,this.collection)
        roles=roles.map(role=> {return ObjectId(role)})
        return roleSchema.find({_id:{$in:roles}},{permissions:1,title:1}).toArray()



    }


}
