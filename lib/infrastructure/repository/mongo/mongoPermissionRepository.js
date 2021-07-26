'use strict';
const permissionRepository = require('../../../application/domain/user/permission/permissionRepository');
const mongo = require('../../orm/mongo/mongoDriver')


module.exports = class extends permissionRepository {

    constructor(permissionEntity) {
        super()
        this.permissionEntity=permissionEntity
        this.collection='roles'
        this.create=this.create.bind(this)
        this.bulkUpdate=this.bulkUpdate.bind(this)
        this.bulkUpdateGenerator=this.bulkUpdateGenerator.bind(this)
    }

    async create(permissionData,dbName) {

        let permissionSchema =await mongo().collection(dbName,this.collection)
        let permission = await this.permissionEntity.setPermission(permissionData)
        return permissionSchema.updateOne({object:permission.object,action:permission.action},{$set:permission},{upsert:true})



    }
    async bulkUpdate(permissions,dbName) {


        let {invalidInput,validInput}=await this.bulkUpdateGenerator(permissions)
        let permissionSchema =await mongo().collection(dbName,this.collection)
        let updateResult=await permissionSchema.bulkWrite(validInput)
        return({invalidInput, updateResult})



    }
    async bulkUpdateGenerator(permissions) {
        let invalidInput=[]
        let validInput=[]

        for(let per of permissions){
            try {

                let validated=await this.permissionEntity.setPermission(per)
                let updateOne={
                    updateOne:{
                        filter:{object:validated.object,action:validated.action},
                        update:{$set:validated},
                        upsert:true
                    }
                }
                validInput.push(updateOne)

            }catch (e){

                invalidInput.push(per)
            }

        }
        return({validInput, invalidInput})
    }

}
