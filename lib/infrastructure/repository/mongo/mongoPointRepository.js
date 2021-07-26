'use strict';
const pointRepository = require('../../../application/domain/point/pointRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {ObjectId} = require('../../orm/mongo/mongoDriver')()

module.exports = class extends pointRepository {

    constructor(pointEntity) {
        super()
        this.pointEntity=pointEntity
        this.collection='points'
        this.create=this.create.bind(this)

    }

    async create(pointData,dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point = await this.pointEntity.setPoint(pointData)
        point._id=ObjectId()
        let result=await pointSchema.insertOne(point)
        return result.insertedId



    }
    async read(pointId,dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point= await pointSchema.aggregate([
            {$match:
                    {_id:pointId}
            },
            {
                $lookup:{
                    from:'pics',
                    localField:"pics",
                    foreignField:"_id",
                    as:'pics'
                }
            }
        ]).toArray()

        return point[0]



    }
    async getPoints(dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point= await pointSchema.aggregate([
            {
                $lookup:{
                    from:'pics',
                    localField:"pics",
                    foreignField:"_id",
                    as:'pics'
                }
            }
        ]).toArray()

        return point



    }



}
