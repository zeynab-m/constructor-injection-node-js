'use strict';
const roleRepository = require('../../../application/domain/user/role/roleRepository');
const postgresRolePermissionsRepository = require('./postgresRolePermissionRepository');
const postgres= require('../../orm/postgres/knexConnection')
let rolePermissionsRepository = new postgresRolePermissionsRepository()
const { randomUUID } = require('crypto');

module.exports = class extends roleRepository {

    constructor(roleEntity) {
        super()
        this.roleEntity=roleEntity
        this.table='roles'
        this.create=this.create.bind(this)
        this.findByTitle=this.findByTitle.bind(this)
        this.getUserRoles=this.getUserRoles.bind(this)
        this.createRolePermissions=this.createRolePermissions.bind(this)
    }
    async create(roleData,dbName) {

        let roleConnection =await postgres().getConnection(dbName)
        await roleConnection(this.table)
            .insert({
                'id':randomUUID(),
                'title':roleData.title,
                'deletedAt':roleData.deletedAt,
                'createdAt':roleData.createdAt,
                'updatedAt':roleData.updatedAt,
            })
            .onConflict('title')
            .ignore()
        let role = await roleConnection(this.table)
            .where({title:roleData.title})
            .select('id')
        console.log({role})
        let createRolePermissions = await this.createRolePermissions({id:role[0].id,permissions:roleData.permissions,dbName})
        console.log({createRolePermissions,role})
        return true



    }
    async findByTitle(title,dbName) {

        let roleConnection =await postgres().getConnection(dbName)
        let role=await roleConnection(this.table)
            .where({
                title: title
            }).select('*')

        return role[0]


    }
    async getUserRoles(roles,dbName) {

        let roleConnection =await postgres().getConnection(dbName)
        return roleConnection(this.table)
            .select('*')
            .leftOuterJoin('rolePermissions','id','=','roleId')
            .leftOuterJoin('permissions','permissionId','=','id')



    }
    async createRolePermissions({id,permissions,dbName}) {

        for await(let per of permissions){

            await rolePermissionsRepository.create({
                roleId:id,
                permissionId:per,
                createdAt:new Date().toISOString(),
                updatedAt:new Date().toISOString()
            },dbName)
        }
        return true


    }


}
