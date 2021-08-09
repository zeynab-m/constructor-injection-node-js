const joi = require("joi");
module.exports=joi.object().keys({

  title:joi.string().required(),
  permissions:joi.array().required().items(joi.object({object:joi.string().required(),action:joi.string().required()})),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),

})