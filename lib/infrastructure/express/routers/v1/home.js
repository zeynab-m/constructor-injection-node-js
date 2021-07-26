'use strict';
const express = require('express');
const {homeControllerSymbol}=require('../../../config/constant').CONTROLLER
const Dependencies= require('../../../../interface/DI/initiateDependencies');
const homeController=Dependencies[homeControllerSymbol]
const authorization = require('../../../authorization/default/defaultAuthorization').authorization;
const router = express.Router();


router.get(
    '/',
    authorization({object:"home",action:"read"}),
    homeController.homeIndex
)


module.exports = router;
