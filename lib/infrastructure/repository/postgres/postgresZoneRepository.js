'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {ObjectId} = require('../../orm/mongo/mongoDriver')()
const { randomUUID } = require('crypto');

module.exports = class extends userRepository {

    constructor(zoneEntity) {
        super()
        this.zoneEntity=zoneEntity
        this.collection='zones'
        this.create=this.create.bind(this)

    }

    async create(zoneData,dbName) {

        let zoneSchema =await mongo().collection(dbName,this.collection)
        let zone = await this.zoneEntity.setZone(zoneData)
        return zoneSchema.insertOne(zone)



    }

    async getAreas(dbName) {


        let zoneSchema =await mongo().collection(dbName,this.collection)
        return zoneSchema.find({deletedAt:null},{}).toArray()



    }
    async delete(id,dbName) {

        let zoneSchema =await mongo().collection(dbName,this.collection)
        return zoneSchema.updateOne({_id:ObjectId(id)},{$set:{deletedAt:new Date().toISOString()}})



    }
    async checkIntersection(coordinates,dbName) {


        let zoneSchema =await mongo().collection(dbName,this.collection)
        return zoneSchema.find({
            deletedAt:null,
            location: {
                $geoIntersects: {
                    $geometry:coordinates
                }
            }
        })



    }

}
