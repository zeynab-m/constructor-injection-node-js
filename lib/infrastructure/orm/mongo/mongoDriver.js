const {MongoClient,Db,ObjectID}=require('mongodb')
const config            = require('./config') ;

const client=new MongoClient(`${config.url}:${config.port}/?connect=direct`, {

    forceServerObjectId:true,
    serverSelectionTimeoutMS: 30000
});
const connections=Db

module.exports= ()=> {
    return{
        connect, collection,ObjectId

    }
    async function connect(){
        try{
            if (!client.isConnected()) {
                await client.connect();
            }

            if (!connections[config.dbName]) {
                connections[config.dbName] = client.db(config.dbName);
            }

            console.log(`Mongo connected on ${config.dbName}`)

        }
        catch (e){

            client.close()
            throw new Error(e)

        }

    }
    async function collection(dbName,collection){

        if(!connections[dbName]){
            throw new Error('db not connected')
        }
        return connections[dbName].collection(collection)

    }
    function ObjectId(id){

        return new ObjectID(id)

    }



}
