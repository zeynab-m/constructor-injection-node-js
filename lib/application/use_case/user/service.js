'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(userRepository,userEntity,cryptoHandler) {

        this.userRepository=userRepository;
        this.cryptoHandler=cryptoHandler;
        this.userEntity=userEntity;
        this.register=this.register.bind(this);
        this.login=this.login.bind(this);

    }
    async  register(user,dbName){

        //validation

        const {repeatedPassword,password}=user
        const userData = await this.userRepository.findUserByUserName(user.userName,dbName);
        if (userData) {
            throw new errors.itemAlreadyExist("user");
        }
        if (repeatedPassword != password) {
            throw new errors.passwordValidation();
        }

        //insertion
        let validUser=await this.userEntity.setUser({...user,id:this.cryptoHandler.uuidGenerator()})
        await this.userRepository.create(validUser,dbName);

        return true;

    }
    async  login(userName, password,dbName) {

        const userData = await this.userRepository.findUserByUserName(userName,dbName);
        if (!userData) {
            throw new errors.userNotExist();
        }

        const compareHash =await this.cryptoHandler.compareHash(
            password,
            userData.password,
            userData.salt
        );
        if (!compareHash) {
            throw new errors.InvalidLoginCredential();
        }
        return userData;
    }




}
