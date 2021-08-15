'use strict';
const permissionRepository = require('../../../application/domain/user/permission/permissionRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer,validator,permissionCollection}= require('../../orm/mongo/migrations')


module.exports = class extends permissionRepository {

    constructor(permissionEntity) {
        super()
        this.permissionEntity=permissionEntity
        this.collection='permissions'
        this.create=this.create.bind(this)
        this.bulkUpdate=this.bulkUpdate.bind(this)
        this.bulkUpdateGenerator=this.bulkUpdateGenerator.bind(this)
    }

    async create(permissionData,dbName) {

        let permissionSchema =await mongo().collection(dbName,this.collection)
        let permission = await validator(
            {
                id:permissionData.id,
                object:permissionData.object,
                action:permissionData.action,
                deletedAt:permissionData.deletedAt,
                createdAt:permissionData.createdAt,
                updatedAt:permissionData.updatedAt,

        },permissionCollection)
        return permissionSchema.updateOne({object:permission.object,action:permission.action},{$set:permission},{upsert:true})



    }
    async bulkUpdate(permissions,dbName) {


        let {validInput}=await this.bulkUpdateGenerator(permissions)
        let permissionSchema =await mongo().collection(dbName,this.collection)
        return await permissionSchema.bulkWrite(validInput)

    }
    async bulkUpdateGenerator(permissions) {
        let validInput=[]

        for(let per of permissions){

                let validated=await validator(
                    {
                        id:per.id,
                        object:per.object,
                        action:per.action,
                        deletedAt:per.deletedAt,
                        createdAt:per.createdAt,
                        updatedAt:per.updatedAt,

                    },permissionCollection)
                let updateOne={
                    updateOne:{
                        filter:{object:validated.object,action:validated.action},
                        update:[{$set: {
                                id: {$cond:[ { $not: ["$id"] }, per.id, "$id" ]},
                                object:per.object,
                                action:per.action,
                                deletedAt:per.deletedAt,
                                createdAt:{$cond:[ { $not: ["$createdAt"] }, per.createdAt, "$createdAt" ]},
                                updatedAt:{$cond:[ { $not: ["$updatedAt"] }, per.updatedAt, "$updatedAt" ]},
                            }}],
                        upsert:true
                    }
                }
                validInput.push(updateOne)

        }
        return({validInput})
    }
    async read(dbName) {

        let permissionSchema =await mongo().collection(dbName,this.collection)
        let permissions= await permissionSchema.find({},{id:1}).toArray()
        permissions=serializer(permissions,'permission')
        return permissions
    }


}
