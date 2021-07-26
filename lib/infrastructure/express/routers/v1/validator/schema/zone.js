const joi=require('joi')

module.exports.create=joi.object().keys({
    name: joi.string().required(),
    geographicalHierarchy: joi.string().required().valid('City','Continent','Country','Region'),
    isActive:joi.number().integer().max(1).min(0),
    location: joi.string().required(),
    center: joi.string().required(),

})
module.exports.delete=joi.object().keys({
    id: joi.string().required(),
})
