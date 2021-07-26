'use strict';
const userSchema = require('./validator/schema/user')
const validation = require('./validator/validator')
const {userControllerSymbol}=require('../../../config/constant').CONTROLLER
const Dependencies= require('../../../../interface/DI/initiateDependencies');
const userController=Dependencies[userControllerSymbol]
const authorization = require('../../../authorization/default/defaultAuthorization').authorization;

const express = require('express');
const router = express.Router();



router.post(
    '/register',
    authorization({object:"user",action:"create"}),
    validation.body(userSchema.register),
    userController.register
)
router.get(
    '/login',
    userController.loginIndex
)
router.post(
    '/login',
    validation.body(userSchema.login),
    userController.login
)
router.get(
    '/logout',
    userController.logout
)

module.exports = router;
