'use strict';
const userRepository = require('../../../application/domain/user/user/userRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const postgres = require('../../orm/postgres/knexConnection')
const { randomUUID } = require('crypto');

module.exports = class extends userRepository {

    constructor(zoneEntity) {
        super()
        this.zoneEntity=zoneEntity
        this.table='zones'
        this.create=this.create.bind(this)

    }

    async create(zoneData,dbName) {

        let zoneConnection =await postgres().getConnection(dbName)
        let st =await postgres().getSt(dbName)
        return await zoneConnection(this.table).insert({
            'id':randomUUID(),
            'name':zoneData.name,
            'geographicalHierarchy':zoneData.geographicalHierarchy,
            'isActive':zoneData.isActive,
            'location':st.geomFromText(`polygon(!{zoneData.location})`, 4326),
            'center':st.geomFromText(`Point(${zoneData.center})`, 4326),
            'deletedAt':zoneData.deletedAt,
            'createdAt':zoneData.createdAt,
            'updatedAt':zoneData.updatedAt,
        })



    }

    async getAreas(dbName) {

        let zoneConnection =await postgres().getConnection(dbName)
        return zoneConnection(this.table)
            .where({deletedAt:null})
            .select('id')




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
        let st =await postgres().getSt(dbName)
        return zoneConnection(this.table)
            .select('id','location')
            .where(
                st.intersects(['location',`POLYGON(${coordinates})`])
            )

    }

}
