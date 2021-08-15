const joi=require('joi')
const validate=require('../../validator/validator').validate

const permissionSchema=joi.object().keys({
    id:joi.string(),
    object:joi.string().required(),
    action:joi.string().required().valid('read','update','create','list'),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),

})
class permissionEntity{

     async setPermission(input){
        let validInput= validate(input,permissionSchema)

        let permissionObject={

            id: validInput.id,
            object: validInput.object,
            action: validInput.action,
            deletedAt:validInput.deletedAt,
            createdAt:validInput.createdAt,
            updatedAt:validInput.updatedAt,
        }


        return permissionObject

    }


}
module.exports={

    permissionEntity,
}
