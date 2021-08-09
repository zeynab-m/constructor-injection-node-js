const joi=require('joi')
const validate=require('../validator/validator').validate

const picSchema=joi.object().keys({

    id:joi.string(),
    name:joi.string().required(),
    thumbnail:joi.string().required(),
    original:joi.string().required(),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),
})
class picEntity {

    async setPic(input){

        let validInput=await validate(input,picSchema)

        let picObject={

            name: validInput.name,
            id: validInput.id,
            thumbnail: validInput.thumbnail,
            original: validInput.original,
            deletedAt:validInput.deletedAt,
            createdAt:validInput.createdAt,
            updatedAt:validInput.updatedAt,
        }


        return picObject

    }


}
module.exports={
    picEntity
}
