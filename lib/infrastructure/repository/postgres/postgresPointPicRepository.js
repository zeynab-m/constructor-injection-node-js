'use strict';
const postgres= require('../../orm/postgres/knexConnection')

module.exports = class{

    constructor() {
        this.table='pointPics'
    }
    async create(data,dbName) {


        let pointPicConnection =await postgres().getConnection(dbName)
        return await pointPicConnection(this.table)
            .insert({
                pointId: data.pointId,
                picId: data.picId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()

            })
            .onConflict(['picId','pointId'])
            .ignore()

    }



}
