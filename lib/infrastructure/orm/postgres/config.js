let dbs = [
    {

        database: 'location_db',
        host: 'localhost',
        port: 5433,
        user: 'zi',
        password: 'zizi',


    }]

const config = {
    client: 'pg',
    connection: {
        user: "",
        host: "",
        port:"",
        database: "",
        password: ""
    },
    pool: { min: 2, max: 10 }
}

module.exports = { dbs,config }