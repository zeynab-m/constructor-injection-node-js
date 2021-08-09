const roleTable = require('./roleTable')
const userTable = require('./userTable')
const permissionTable = require('./permissionTable')
const zoneTable = require('./zoneTable')
const pointTable = require('./pointTable')
const picTable = require('./picTable')
const userRoleTable = require('./userRoleTable')
const pointPicTable = require('./pointPicTable')
const rolePermissionTable = require('./rolePermissionTable')

const migrate = async (tenant) => {

  await roleTable(tenant)
  await userTable(tenant)
  await permissionTable(tenant)
  await pointTable(tenant)
  await zoneTable(tenant)
  await picTable(tenant)
  await rolePermissionTable(tenant)
  await pointPicTable(tenant)
  await userRoleTable(tenant)
  return true
 /* Promise.all([

          await roleTable(tenant)
      await userTable(tenant)
      await permissionTable(tenant)
      await rolePermissionTable(tenant)
      await pointTable(tenant)
      await picTable(tenant)
      await zoneTable(tenant)
      await pointPicTable(tenant)
      await userRoleTable(tenant)


  ]).then((values) => {

    console.log(values);
    return true
  })*/

}

module.exports = migrate
