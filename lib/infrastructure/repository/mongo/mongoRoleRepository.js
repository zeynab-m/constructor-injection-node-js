'use strict';
const roleRepository = require('../../../application/domain/user/role/roleRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {serializer, validator, roleCollection} = require('../../orm/mongo/migrations')

module.exports = class extends roleRepository {

    constructor(roleEntity) {
        super()
        this.roleEntity = roleEntity
        this.collection = 'roles'
        this.create = this.create.bind(this)
        this.findByTitle = this.findByTitle.bind(this)
        this.getUserRoles = this.getUserRoles.bind(this)
    }

    async create(roleData, dbName) {


        let roleSchema = await mongo().collection(dbName, this.collection)
        let role = validator({
            id: roleData.id,
            title: roleData.title,
            permissions: roleData.permissions,
            deletedAt: roleData.deletedAt,
            createdAt: roleData.createdAt,
            updatedAt: roleData.updatedAt,
        }, roleCollection)
        return roleSchema.update({title: role.title}, [{
                $set: {
                    id: {$cond:[ { $not: ["$id"] }, roleData.id, "$id" ]},
                    title: roleData.title,
                    permissions: roleData.permissions,
                    deletedAt: roleData.deletedAt,
                    createdAt: {$cond: [{ $not: ["$createdAt"] }, roleData.createdAt, "$createdAt"]},
                    updatedAt: {$cond: [{ $not: ["$updatedAt"] }, roleData.updatedAt, "$updatedAt"]},
                }
            }],
            {upsert: true})


    }

    async findByTitle(title, dbName) {


        let roleSchema = await mongo().collection(dbName, this.collection)
        let role = await roleSchema.findOne({title})
        role = serializer(role, 'role')
        return (role)


    }

    async getUserRoles(roles, dbName) {


        let roleSchema = await mongo().collection(dbName, this.collection)
        let role = await roleSchema.aggregate([
            {
                $match:
                    {id: {$in: roles}}
            },
            {
                $lookup: {
                    from: 'permissions',
                    localField: "permissions",
                    foreignField: "id",
                    as: 'permissions'
                }
            }
        ]).toArray()
        role = serializer(role, 'role')
        return (role)


    }


}
