const joi = require("joi");
module.exports=joi.object().keys({

  id:joi.string().required(),
  object:joi.string().required(),
  action:joi.string().required().valid('read','update','create','list'),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),

})
