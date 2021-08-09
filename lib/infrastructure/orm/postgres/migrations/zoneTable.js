const zoneTable = (tenant) => {

    return tenant.schema.hasTable('zones')
        .then(function (exists) {
            if (!exists) {
                return tenant.schema.createTable('zones', (table) => {
                    table.uuid('id').notNullable().primary()
                    table.string('name').notNullable()
                    table.string('geographicalHierarchy').notNullable()
                    table.binary('isActive', 1)
                    table.specificType('location', 'polygon').notNullable()
                    table.specificType('center', 'point').notNullable()
                    table.timestamp('deletedAt')
                    table.timestamp('createdAt').notNullable()
                    table.timestamp('updatedAt').notNullable()
                })

            }
        })

}

module.exports = zoneTable
