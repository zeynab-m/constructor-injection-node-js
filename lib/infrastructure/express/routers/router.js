const express = require('express');
const router = express.Router();

const Point = require('../routers/v1/point');
const zone= require('../routers/v1/zone');
const home = require('../routers/v1/home');
const user = require('./v1/user');
const authentication = require('../../security/authentication');


router.use('/backOffice/v1/user', user);
router.use('/backOffice/v1/zone',authentication.authentication, zone);
router.use('/backOffice/v1/point',authentication.authentication, Point);
router.use('/backOffice/v1/home',authentication.authentication, home);


module.exports = router;
