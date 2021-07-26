const {cryptoHandlerSymbol}= require('../../../infrastructure/config/constant').UTIL
const {cryptoHandler}= require('../../../infrastructure/utils/crypto')

module.exports=(diContainer)=> {

    diContainer.constructor(cryptoHandlerSymbol, {dependency:[],conn:cryptoHandler});
}



