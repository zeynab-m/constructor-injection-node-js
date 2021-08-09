const joi = require("joi");
module.exports=joi.object().keys({

  name:joi.string().required(),
  about:joi.string().required(),
  isActive:joi.number().integer().max(1).min(0),
  location:joi.object({type:joi.any().valid('Point'),coordinates:joi.array()}).required(),
  contact:joi.object({address:joi.string().allow('',null),phone:joi.string().allow('',null),website:joi.string().allow('',null)}),
  pics:joi.array().default([]),
  visitedAt:joi.date().iso().required(),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString())
})