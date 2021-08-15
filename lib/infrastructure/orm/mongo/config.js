module.exports={

    dbName:'location_db',
     host(dbName){
        // return `mongodb://root:example@localhost:27017/${dbName}`
        return `mongodb://root:example@127.0.0.1:27017/${dbName}?authSource=admin`

     },
    url:'mongodb://root:example@localhost',
    port:27017

}
