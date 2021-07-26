const joi=require('joi')

module.exports.create=joi.object().keys({
    id:joi.string().allow('',null),
    name:joi.string().required(),
    about:joi.string().required(),
    location:joi.string().required(),
    address:joi.string().allow(''),
    phone:joi.string().allow(''),
    website:joi.string().allow(''),
    visitedAt:joi.date().iso().required(),


})