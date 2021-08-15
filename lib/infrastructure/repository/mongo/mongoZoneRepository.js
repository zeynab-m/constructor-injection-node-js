'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer,validator,zoneCollection}= require('../../orm/mongo/migrations')

module.exports = class extends userRepository {

    constructor(zoneEntity) {
        super()
        this.zoneEntity=zoneEntity
        this.collection='zones'
        this.create=this.create.bind(this)

    }

    async create(zoneData,dbName) {

        let zoneSchema =await mongo().collection(dbName,this.collection)
        let zone = validator({
            id:zoneData.id,
            name:zoneData.name,
            geographicalHierarchy:zoneData.geographicalHierarchy,
            isActive:zoneData.isActive,
            location:zoneData.location,
            center:zoneData.center,
            deletedAt:zoneData.deletedAt,
            createdAt:zoneData.createdAt,
            updatedAt:zoneData.updatedAt,
        },zoneCollection)
        return zoneSchema.insertOne(zone)



    }

    async getAreas(dbName) {


        let zoneSchema =await mongo().collection(dbName,this.collection)
        let zone=await zoneSchema.find({deletedAt:null},{}).toArray()
        zone=serializer(zone,'zone')
        return (zone)



    }
    async delete(id,dbName) {

        let zoneSchema =await mongo().collection(dbName,this.collection)
        return zoneSchema.updateOne({id:id},{$set:{deletedAt:new Date().toISOString()}})



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
