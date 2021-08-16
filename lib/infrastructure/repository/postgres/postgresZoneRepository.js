'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const postgres = require('../../orm/postgres/knexConnection')
const serializer = require("../../orm/postgres/migrations/serializer");

module.exports = class extends userRepository {

    constructor(zoneEntity) {
        super()
        this.zoneEntity=zoneEntity
        this.table='zones'
        this.create=this.create.bind(this)

    }

    async create(zoneData,dbName) {

        let zoneConnection =await postgres().getConnection(dbName)
        return await zoneConnection(this.table).insert({
            'id':zoneData.id,
            'name':zoneData.name,
            'geographicalHierarchy':zoneData.geographicalHierarchy,
            'isActive':zoneData.isActive,
            'location':zoneConnection.raw(`ST_GeomFromGeoJSON('{"type":"${zoneData.location.type}","coordinates":[${JSON.stringify(zoneData.location.coordinates)}]}')`),
            'center':zoneConnection.raw(`ST_GeomFromGeoJSON('{"type":"${zoneData.center.type}","coordinates":${JSON.stringify(zoneData.center.coordinates)}}')`),
            'deletedAt':zoneData.deletedAt,
            'createdAt':zoneData.createdAt,
            'updatedAt':zoneData.updatedAt,
        })



    }

    async getAreas(dbName) {

        let zoneConnection =await postgres().getConnection(dbName)
        let zones=await zoneConnection(this.table)
            .where({deletedAt:null})
            .select(
                zoneConnection.raw(`ST_AsGeoJSON(location)::json as location`),
                zoneConnection.raw(`ST_AsGeoJSON(center)::json as center`),
                'id',
                'name',
                'geographicalHierarchy',
                'isActive',
                'createdAt',
                'updatedAt')
        zones=serializer(zones,'zone')
        return(zones)




    }
    async delete(id,dbName) {

        let zoneConnection =await postgres().getConnection(dbName)
        return zoneConnection(this.table)
            .where({'id': id})
            .update({
                deletedAt:new Date().toISOString()
            })



    }
    async checkIntersection(coordinates,dbName) {

    let zoneConnection =await postgres().getConnection(dbName)
        return  zoneConnection(this.table)
            .where({deletedAt:null})
            .select('id','location')
            .where(
                zoneConnection.raw(`ST_Intersects(location,ST_GeomFromGeoJSON('{"type":"${coordinates.type}","coordinates":[${JSON.stringify(coordinates.coordinates)}]}'))`)
            )

        /*const transform = coordinates.coordinates.map(position => {
                    return `${position[0]} ${position[1]}`
                }).join(',');
           zoneConnection.raw(`ST_Intersects(location,ST_GeomFromText('POLYGON((${transform}))'))`)

*/
    }

}
