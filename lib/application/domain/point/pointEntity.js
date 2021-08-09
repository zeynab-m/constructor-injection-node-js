const joi=require('joi')
const validate=require('../validator/validator').validate

const pointSchema=joi.object().keys({

    id:joi.string(),
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
class pointEntity {

    async setPoint(input){

        let validInput=await validate(input,pointSchema)
        let pointObject={

            id: validInput.id,
            name: validInput.name,
            about: validInput.about,
            location: validInput.location,
            visitedAt:validInput.visitedAt,
            contact:validInput.contact,
            pics:validInput.pics,
            isActive:validInput.isActive ||0,
            createdAt:validInput.createdAt,
            updatedAt:validInput.updatedAt,
            deletedAt:validInput.deletedAt,
        }

        return pointObject



    }


}
module.exports={
    pointEntity
}
