const pointTable = (tenant) => {


    return  tenant.schema.hasTable('points').then(function (exists) {
        if (!exists) {

            return   tenant.schema.createTable('points', (table) => {
                table.uuid('id').notNullable().primary()
                table.string('name').notNullable()
                table.string('about').notNullable()
                table.jsonb('contact')
                table.integer('isActive', 1)
                table.specificType("location", "geometry(point, 4326)").notNullable()
                table.timestamp('visitedAt').notNullable()
                table.timestamp('deletedAt')
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}


module.exports = pointTable
