const joi=require('joi')
const validate=require('../../validator/validator').validate

const userSchema=joi.object().keys({
    id:joi.string().required(),
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    userName:joi.string().required(),
    password:joi.string().required(),
    salt:joi.string().required(),
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

            let{hashedPassword,salt} = await this.HashPassword(input.password)
            input.password=hashedPassword
            input.salt=salt
            let validInput= validate(input,userSchema)
            let userObject={

                id: validInput.id,
                firstName: validInput.firstName,
                lastName: validInput.lastName,
                userName:validInput.userName,
                salt:validInput.salt,
                password:validInput.password,
                roles:validInput.roles,
                deletedAt:validInput.deletedAt,
                createdAt:validInput.createdAt,
                updatedAt:validInput.updatedAt,
            }

        return userObject

    }
    async HashPassword(password){


        const salt =await  this.cryptoHandler.saltGenerator(32)
        const hashedPassword =await  this.cryptoHandler.hashGenerate(password,salt)
        return ({hashedPassword,salt})



    }


}
module.exports={
    userEntity
}
