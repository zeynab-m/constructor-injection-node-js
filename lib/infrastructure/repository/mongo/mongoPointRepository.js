'use strict';
const pointRepository = require('../../../application/domain/point/pointRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer,validator,pointCollection}= require('../../orm/mongo/migrations')

module.exports = class extends pointRepository {

    constructor(pointEntity) {
        super()
        this.pointEntity=pointEntity
        this.collection='points'
        this.create=this.create.bind(this)

    }

    async create(pointData,dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point = await validator({
            id:pointData.id,
            name:pointData.name,
            about:pointData.about,
            isActive:pointData.isActive,
            location:pointData.location,
            contact:pointData.contact,
            pics:pointData.pics,
            visitedAt:pointData.visitedAt,
            deletedAt:pointData.deletedAt,
            createdAt:pointData.createdAt,
            updatedAt:pointData.updatedAt
        },pointCollection)
        return await pointSchema.insertOne(point)



    }
    async read(pointId,dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point= await pointSchema.aggregate([
            {$match:
                    {id:pointId}
            },
            {
                $lookup:{
                    from:'pics',
                    localField:"pics",
                    foreignField:"id",
                    as:'pics'
                }
            }
        ]).toArray()
        point=serializer(point[0],'point')
        return point



    }
    async getPoints(dbName) {

        let pointSchema =await mongo().collection(dbName,this.collection)
        let point= await pointSchema.aggregate([
            {
                $lookup:{
                    from:'pics',
                    localField:"pics",
                    foreignField:"id",
                    as:'pics'
                }
            }
        ]).toArray()
        point=serializer(point,'point')
        return point



    }



}
