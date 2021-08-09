const userRoleTable = (tenant) => {

    return tenant.schema.hasTable('userRoles').then(function (exists) {
        if (!exists) {
            return tenant.schema.createTable('userRoles', (table) => {
                table.uuid('roleId')
                table.uuid('userId')
                table.foreign('roleId')
                    .references('id')
                    .inTable('roles')
                    .onDelete('CASCADE')
                table.foreign('userId')
                    .references('id')
                    .inTable('users')
                    .onDelete('CASCADE')
                table.unique(['roleId', 'userId'])
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })
}
module.exports = userRoleTable
