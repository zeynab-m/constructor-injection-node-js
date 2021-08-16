'use strict';
const picRepository = require('../../../application/domain/pic/picRepository');
const postgres= require('../../orm/postgres/knexConnection')
module.exports = class extends picRepository {

    constructor(picEntity) {
        super()
        this.picEntity=picEntity
        this.table='pics'
        this.bulkInsert=this.bulkInsert.bind(this)

    }

    async bulkInsert(incomingPics,dbName) {


        let picSchema =await postgres().getConnection(dbName)
        return await picSchema(this.table).insert(incomingPics)



    }



}
