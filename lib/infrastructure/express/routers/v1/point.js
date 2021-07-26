'use strict';
const {pointControllerSymbol}=require('../../../config/constant').CONTROLLER
const Dependencies= require('../../../../interface/DI/initiateDependencies');
const pointController=Dependencies[pointControllerSymbol]
const express = require('express');
const validator = require('../v1/validator/validator');
const validationSchema = require('../v1/validator/schema/point');
const router = express.Router();
const multer  = require('multer')
const path  = require('path')
const authorization = require('../../../authorization/default/defaultAuthorization').authorization;



router.get(
    '/create',
    authorization({object:"point",action:"read"}),
    pointController.createIndex
)
router.post(
    '/create',
    authorization({object:"point",action:"create"}),
    multer({
        dest: path.join(__dirname,'../../../../../public/location/pic')
    }).any(),
    validator.body(validationSchema.create),
    pointController.create
)


module.exports = router;
