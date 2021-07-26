const joi= require('joi')


module.exports.login=joi.object().keys({

    userName:joi.string().required(),
    password:joi.string().required(),
})
module.exports.register=joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userName:joi.string().required(),
    password:joi.string().required(),
    roles:joi.array().required(),
    repeatedPassword:joi.string().required(),
})
