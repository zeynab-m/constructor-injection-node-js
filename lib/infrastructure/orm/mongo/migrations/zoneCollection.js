const joi = require("joi");
module.exports=joi.object().keys({

  id:joi.string().required(),
  name:joi.string().required(),
  geographicalHierarchy:joi.string().required().valid('City','Continent','Country','Region'),
  isActive:joi.number().integer().max(1).min(0),
  location: joi.object({type:joi.any().valid('Polygon'),coordinates:joi.array()}).required(),
  center:joi.object({type:joi.any().valid('Point'),coordinates:joi.array()}).required(),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),


})