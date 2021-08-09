const rolePermissionTable = (tenant) => {

    return tenant.schema.hasTable('rolePermissions').then(function (exists) {
        if (!exists) {

            return  tenant.schema.createTable('rolePermissions', (table) => {
                table.uuid('roleId')
                table.uuid('permissionId')
                table.foreign('roleId')
                    .references('id')
                    .inTable('roles')
                    .onDelete('CASCADE')
                table.foreign('permissionId')
                    .references('id')
                    .inTable('permissions')
                    .onDelete('CASCADE')
                table.unique(['roleId', 'permissionId'])
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}
module.exports = rolePermissionTable
