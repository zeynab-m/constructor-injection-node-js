'use strict';
const {zoneControllerSymbol}=require('../../../config/constant').CONTROLLER
const Dependencies= require('../../../../interface/DI/initiateDependencies');
const zoneController=Dependencies[zoneControllerSymbol]
const express = require('express');
const validator = require('../v1/validator/validator');
const validationSchema = require('../v1/validator/schema/zone');
const authorization = require('../../../authorization/default/defaultAuthorization').authorization;
const router = express.Router();

router.get(
    '/create',
    authorization({object:"zone",action:"read"}),
    zoneController.createIndex
)
router.post(
    '/create',
    authorization({object:"zone",action:"create"}),
    validator.body(validationSchema.create),
    zoneController.create
)
router.get(
    '/list',
    authorization({object:"zone",action:"list"}),
    zoneController.list
)
router.get(
    '/delete/:id',
    authorization({object:"zone",action:"update"}),
    validator.params(validationSchema.delete),
    zoneController.delete
)

module.exports = router;
