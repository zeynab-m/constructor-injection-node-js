'use strict';
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const router = require('../routers/router');
const {bindDbName,responseFormat,locals,errorHandler} = require('../middleWares');
const session = require('../middleWares/setSession');
const fixture = require('../../fixtures/initialData');



module.exports.createServer =async function ()  {

        const app = express();

        const server =http.createServer(app).listen(process.env.PORT || 1508, () => {
            console.log(`Listening on 1508`);
        })

        app.set('view engine', 'ejs');
        // app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(session.setSession);
        app.use('/public', express.static('public'))
        app.use(bindDbName.addDbName);
        app.use(responseFormat.responseFormat);
        app.use(locals)
        app.use(router)
        errorHandler(app);


        fixture().init()

        return server;

}



