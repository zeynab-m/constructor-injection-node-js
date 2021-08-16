const knex = require('knex')
const { dbs,config } = require('./config')
const migrate = require('./migrations')
let tenantMapping
module.exports = () => {
  return {
    connect, getConnection

  }

  async function connect() {
    try {

      const tenants = dbs

      tenantMapping = tenants.map((tenant) =>
          {
           return  {
              database:tenant.database,
              connection: knex(getConfig(tenant)),
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
