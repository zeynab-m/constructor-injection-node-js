const roleTable = (tenant) => {

    return  tenant.schema.hasTable('roles').then(function (exists) {
        if (!exists) {
           return   tenant.schema.createTable('roles', (table) => {
                table.uuid('id').notNullable().primary()
                table.string('title').unique().notNullable()
                table.timestamp('deletedAt')
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}

module.exports = roleTable
