'use strict';
require('dotenv').config()
const bootstrap = require("./lib/infrastructure/config/bootstrap");
const express = require('./lib/infrastructure/express/webserver/express')


async function start (){

    await bootstrap().init();
    await express.createServer();
    return ;

}


start().then(()=>{
    console.log(`server running at :${process.env.PORT}`)

    })
    .catch(err=>{

    console.log('server initiation error',{err})

})
