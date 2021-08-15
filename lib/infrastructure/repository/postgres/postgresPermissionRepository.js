'use strict';
const permissionRepository = require('../../../application/domain/user/permission/permissionRepository');
const postgres= require('../../orm/postgres/knexConnection')
const { randomUUID } = require('crypto');
module.exports = class extends permissionRepository {

    constructor(permissionEntity) {
        super()
        this.permissionEntity=permissionEntity
        this.table='permissions'
        this.bulkUpdate=this.bulkUpdate.bind(this)
        this.read=this.read.bind(this)
    }
    async read(dbName) {

        let permissionConnection =await postgres().getConnection(dbName)
        return permissionConnection(this.table)
            .select('id')


    }
    async bulkUpdate(permissions,dbName) {

        let permissionConnection =await postgres().getConnection(dbName)
        permissions=permissions.map(per=> {
            return {...per, id: randomUUID()}
        })
       return await permissionConnection(this.table)
            .insert(permissions)
            .onConflict(['object','action'])
            .ignore()




    }

}
