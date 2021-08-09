const permissionTable = (tenant) => {

    return tenant.schema.hasTable('permissions').then(function (exists) {
        if (!exists) {
            return tenant.schema.createTable('permissions', (table) => {
                table.uuid('id').notNullable().primary()
                table.string('object').notNullable()
                table.string('action').notNullable()
                table.unique(['object', 'action'])
                table.timestamp('deletedAt')
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}

module.exports = permissionTable
