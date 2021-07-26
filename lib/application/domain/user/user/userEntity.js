const joi=require('joi')
const validate=require('../../validator/validator').validate

const userSchema=joi.object().keys({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    userName:joi.string().required(),
    password:joi.string().required(),
    roles:joi.array().required(),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),
})

class userEntity{
    constructor(cryptoHandler) {

        this.cryptoHandler=cryptoHandler
        this.setUser=this.setUser.bind(this)
        this.HashPassword=this.HashPassword.bind(this)
    }

    async setUser(input){

            let validInput=await validate(input,userSchema)
            let{hashedPassword,salt} =await this.HashPassword(validInput.password)
            let userObject={
                firstName: validInput.firstName,
                lastName: validInput.lastName,
                userName:validInput.userName,
                salt:salt,
                password:hashedPassword,
                roles:validInput.roles,
                deletedAt:validInput.deletedAt,
                createdAt:validInput.createdAt,
                updatedAt:validInput.updatedAt,
            }

        return userObject

    }
    async HashPassword(password){


        const salt = await this.cryptoHandler.saltGenerator(32)
        const hashedPassword = await this.cryptoHandler.hashGenerate(password,salt)
        return ({hashedPassword,salt})



    }


}
module.exports={
    userEntity
}
