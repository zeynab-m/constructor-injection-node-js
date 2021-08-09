const joi=require('joi')
const validate=require('../validator/validator').validate

const zoneSchema= joi.object().keys({
    id:joi.string(),
    name:joi.string().required(),
    geographicalHierarchy:joi.string().required().valid('City','Continent','Country','Region'),
    isActive:joi.number().integer().max(1).min(0),
    location: joi.object({type:joi.any().valid('Polygon'),coordinates:joi.array()}).required(),
    center:joi.object({type:joi.any().valid('Point'),coordinates:joi.array()}).required(),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),


})
class zoneEntity{

    async setZone(input){


        let validInput=await validate(input,zoneSchema)

        let zoneObject={

            id: validInput.id,
            name: validInput.name,
            location: validInput.location,
            center:validInput.center,
            isActive:validInput.isActive,
            geographicalHierarchy:validInput.geographicalHierarchy,
            deletedAt:validInput.deletedAt,
            createdAt:validInput.createdAt,
            updatedAt:validInput.updatedAt,
        }

        return zoneObject


    }


}
module.exports={
    zoneEntity
}
