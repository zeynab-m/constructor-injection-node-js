const joi = require("joi");
module.exports=joi.object().keys({
  firstName:joi.string().required(),
  lastName:joi.string().required(),
  userName:joi.string().required(),
  password:joi.string().required(),
  roles:joi.array().required(),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),
})