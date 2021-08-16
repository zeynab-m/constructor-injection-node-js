const pointPicTable = (tenant) => {

    return  tenant.schema.hasTable('pointPics').then(function (exists) {
        if (!exists) {
            return  tenant.schema.createTable('pointPics', (table) => {
                table.uuid('picId')
                table.uuid('pointId')
                table.foreign('picId')
                    .references('id')
                    .inTable('pics')
                    .onDelete('CASCADE')
                table.foreign('pointId')
                    .references('id')
                    .inTable('points')
                    .onDelete('CASCADE')
                table.unique(['pointId', 'picId'])
                table.timestamp('createdAt').notNullable()
                table.timestamp('updatedAt').notNullable()
            })
        }
    })

}
module.exports = pointPicTable
