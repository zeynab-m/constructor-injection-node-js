const userTable = (tenant) => {

    return tenant.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return tenant.schema.createTable('users', (table) => {
                table.uuid('id').notNullable().primary()
                table.string('firstName').notNullable()
                table.string('lastName')
                table.string('salt').notNullable()
                table.string('userName').unique().notNullable()
                table.string('password').notNullable()
                table.timestamp('deletedAt')
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}

module.exports = userTable
