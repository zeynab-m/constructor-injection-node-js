'use strict';
const pointRepository = require('../../../application/domain/point/pointRepository');
const postgres = require('../../orm/postgres/knexConnection')
const { randomUUID } = require('crypto');

module.exports = class extends pointRepository {

    constructor(pointEntity) {
        super()
        this.pointEntity=pointEntity
        this.table='points'
        this.create=this.create.bind(this)
        this.read=this.read.bind(this)
        this.getPoints=this.getPoints.bind(this)

    }

    async create(pointData,dbName) {

        let pointConnection =await postgres().getConnection(dbName)
        let st =await postgres().getSt(dbName)
        return await pointConnection(this.table)
            .insert({
                'id':randomUUID(),
                'name':pointData.title,
                'about':pointData.about,
                'contact':pointData.contact,
                'isActive':pointData.isActive,
                'location':st.geomFromText(`Point(${pointData.center})`, 4326),
                'visitedAt':pointData.visitedAt,
                'deletedAt':pointData.deletedAt,
                'createdAt':pointData.createdAt,
                'updatedAt':pointData.updatedAt,
            })


    }
    async read(pointId,dbName) {

        let pointConnection =await postgres().getConnection(dbName)
       let x= await pointConnection('points')
            .select('*')
            .leftOuterJoin('pointPics','id','=','pointId')
            .leftOuterJoin('pics','picId','=','id')

       console.log({x})




    }
    async getPoints(dbName) {

        let pointConnection =await postgres().getConnection(dbName)
        let point= await pointConnection('points')
            .select('*')
            .leftOuterJoin('pointPics','id','=','pointId')
            .leftOuterJoin('pics','picId','=','id')

        return point



    }



}
