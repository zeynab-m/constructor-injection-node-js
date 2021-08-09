'use strict';
const postgres= require('../../orm/postgres/knexConnection')
const { randomUUID } = require('crypto'); // Added in: node v14.17.0

module.exports = class{

    constructor() {
        this.table='rolePermissions'
    }
    async create(data,dbName) {


        let rolePermissionsConnection =await postgres().getConnection(dbName)
        return await rolePermissionsConnection(this.table)
            .insert({
                roleId:data.roleId,
                permissionId:data.permissionId,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt,

            })
            .onConflict(['roleId','permissionId'])
            .ignore()

    }



}
