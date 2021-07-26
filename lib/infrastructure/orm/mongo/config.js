module.exports={

    dbName:'location_db',
     host(dbName){
        return `mongodb://localhost:27017/${dbName}`

     },
    url:'mongodb://localhost',
    port:27017

}
