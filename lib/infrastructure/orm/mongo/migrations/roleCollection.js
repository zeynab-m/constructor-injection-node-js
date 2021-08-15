const joi = require("joi");
module.exports=joi.object().keys({

  id:joi.string().required(),
  title:joi.string().required(),
  permissions:joi.array().required(),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),

})