'use strict';
 const constants= require("./constant")
 const mongoDriverOrm= require("../orm/mongo/mongoDriver")

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
                await mongoDriverOrm().connect()

            default:
                await mongoDriverOrm().connect()


        }

    }




}
