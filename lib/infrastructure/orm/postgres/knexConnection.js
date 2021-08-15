const knex = require('knex')
const { dbs,config } = require('./config')
const migrate = require('./migrations')
const knexPostgis = require("knex-postgis");
let tenantMapping
module.exports = () => {
  return {
    connect, getConnection,getSt

  }

  async function connect() {
    try {

      const tenants = dbs

      tenantMapping = tenants.map((tenant) =>
          {
            let connection= knex(getConfig(tenant))

           return  {
              database:tenant.database,
              connection: connection,
              st: knexPostgis(connection)
            }
      })

      for await (let tenant of tenants ){
        let connection= getConnection(tenant.database)
         await migrate(connection)
      }
      return


    } catch (error) {
      console.error(error)
    }
  }

  function getConnection(dbName) {
    const tenant = tenantMapping.find((tenant) => tenant.database === dbName)

    if (!tenant) return null

    return tenant.connection
  }
  function getSt(dbName) {
    const tenant = tenantMapping.find((tenant) => tenant.database === dbName)

    if (!tenant) return null

    return tenant.st
  }

  function getConfig(tenant) {
    const {user, database, password} = tenant

    return {
      ...config,
      connection: {
        ...config.connection,
        user,
        database,
        password
      }
    }
  }


}
