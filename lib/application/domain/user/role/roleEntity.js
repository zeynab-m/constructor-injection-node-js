const joi=require('joi')
const validate=require('../../validator/validator').validate

const roleSchema=joi.object().keys({

    title:joi.string().required(),
    permissions:joi.array().required().items(joi.object({object:joi.string().required(),action:joi.string().required()})),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),

})
class roleEntity{

    async setRole (input){

        let validInput=await validate(input,roleSchema)

        let roleObject={
            title: validInput.title,
            permissions: validInput.permissions,
            deletedAt:validInput.deletedAt,
            createdAt:validInput.createdAt,
            updatedAt:validInput.updatedAt,
        }


            return roleObject

    }


}
module.exports={
    roleEntity
}
