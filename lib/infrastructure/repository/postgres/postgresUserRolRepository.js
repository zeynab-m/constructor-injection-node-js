'use strict';
const postgres= require('../../orm/postgres/knexConnection')

module.exports = class{

    constructor() {
        this.table='userRoles'
    }
    async create(data,dbName) {


        let userRolesConnection =await postgres().getConnection(dbName)
        return await userRolesConnection(this.table)
            .insert({
                roleId:data.roleId,
                userId:data.userId,
                createdAt:data.createdAt,
                updatedAt:data.updatedAt,

            })
            .onConflict(['roleId','userId'])
            .ignore()

    }



}
