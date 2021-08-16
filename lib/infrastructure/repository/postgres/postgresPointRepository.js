'use strict';
const pointRepository = require('../../../application/domain/point/pointRepository');
const postgresPointPicRepository = require('./postgresPointPicRepository');
const postgres = require('../../orm/postgres/knexConnection')
const PointPicRepository = new postgresPointPicRepository();
module.exports = class extends pointRepository {

    constructor(pointEntity) {
        super()
        this.pointEntity = pointEntity
        this.table = 'points'
        this.create = this.create.bind(this)
        this.read = this.read.bind(this)
        this.getPoints = this.getPoints.bind(this)

    }

    async create(pointData, dbName) {

        let pointConnection = await postgres().getConnection(dbName)
        await pointConnection(this.table)
            .insert({
                'id': pointData.id,
                'name': pointData.name,
                'about': pointData.about,
                'contact': pointData.contact,
                'isActive': pointData.isActive,
                'location': pointConnection.raw(`ST_GeomFromGeoJSON('{"type":"${pointData.location.type}","coordinates":${JSON.stringify(pointData.location.coordinates)}}')`),
                'visitedAt': pointData.visitedAt,
                'deletedAt': pointData.deletedAt,
                'createdAt': pointData.createdAt,
                'updatedAt': pointData.updatedAt,
            })
        let createPointPics = await this.createPointPics({
            id: pointData.id,
            pics: pointData.pics,
            dbName
        })
        return true

    }

    async read(pointId, dbName) {

        let pointConnection = await postgres().getConnection(dbName)
        let point = await pointConnection('points')
            .where({'points.id': pointId})
            .select(
                pointConnection.raw(`ST_AsGeoJSON(location)::json as location`),
                'points.id as id',
                'points.name as name',
                'points.about as about',
                'points.contact as contact',
                'points.isActive as isActive',
                'points.visitedAt as visitedAt',
                'points.createdAt as createdAt',
                'points.updatedAt as updatedAt'
            )
            .leftOuterJoin('pointPics', 'points.id', '=', 'pointPics.pointId')
            .select([
                pointConnection.raw(`jsonb_agg(jsonb_build_object('thumbnail', pics.thumbnail,'original', pics.original)) as pics`)
            ])
            .leftOuterJoin('pics', 'pointPics.picId', '=', 'pics.id')
            .groupBy('points.id')
        return point[0]

    }

    async getPoints(dbName) {

        let pointConnection = await postgres().getConnection(dbName)

        return await pointConnection('points')
            .select(
                pointConnection.raw(`ST_AsGeoJSON(location)::json as location`),
                'points.id as id',
                'points.name as name',
                'points.about as about',
                'points.contact as contact',
                'points.isActive as isActive',
                'points.visitedAt as visitedAt',
                'points.createdAt as createdAt',
                'points.updatedAt as updatedAt'
            )
            .leftOuterJoin('pointPics', 'points.id', '=', 'pointPics.pointId')
            .select([
                pointConnection.raw(`jsonb_agg(jsonb_build_object('thumbnail', pics.thumbnail,'original', pics.original)) as pics`)
            ])
            .leftOuterJoin('pics', 'pointPics.picId', '=', 'pics.id')
            .groupBy('points.id')


    }

    async createPointPics({id, pics, dbName}) {

        for await(let pic of pics) {

            await PointPicRepository.create({
                pointId: id,
                picId: pic,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }, dbName)
        }
        return true


    }


}
