'use strict';
 const constants= require("./constant")
 const mongoDriverOrm= require("../orm/mongo/mongoDriver")
 const postgresOrm= require("../orm/postgres/knexConnection")

module.exports=()=>{
    return{
        init
    }

    async function init(){

         await dbInitiation()

     }
    async function dbInitiation(){

        switch (process.env.DB_DIALECT){

            case constants.SUPPORTED_DATABASE.MONGO:
                console.log('mongo')
                await mongoDriverOrm().connect()
                break;
            case constants.SUPPORTED_DATABASE.POSTGRES:
                console.log('postgres')
                await postgresOrm().connect()
                break;

            default:
                await mongoDriverOrm().connect()


        }

    }




}
