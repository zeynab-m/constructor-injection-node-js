const picTable = (tenant) => {

    return tenant.schema.hasTable('pics').then(function (exists) {
        if (!exists) {

            return tenant.schema.createTable('pics', (table) => {
                table.uuid('id').notNullable().primary()
                table.string('name').notNullable()
                table.string('thumbnail').notNullable()
                table.string('original').notNullable()
                table.timestamp('deletedAt')
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}

module.exports = picTable
