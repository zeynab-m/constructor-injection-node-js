const {userServiceSymbol,zoneServiceSymbol,pointServiceSymbol,picServiceSymbol}= require('../../../infrastructure/config/constant').SERVICE
const {userRepositorySymbol,permissionRepositorySymbol,roleRepositorySymbol,zoneRepositorySymbol,pointRepositorySymbol,picRepositorySymbol}= require('../../../infrastructure/config/constant').REPOSITORY
const {userEntitySymbol,permissionEntitySymbol,roleEntitySymbol,zoneEntitySymbol,pointEntitySymbol,picEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const {cryptoHandlerSymbol}= require('../../../infrastructure/config/constant').UTIL
const {picToolSymbol}= require('../../../infrastructure/config/constant').TOOL
const {userService}= require('../../../application/use_case/user')
const {zoneService}= require('../../../application/use_case/zone')
const {pointService}= require('../../../application/use_case/point')
const {picService}= require('../../../application/use_case/tools')

module.exports=(diContainer)=> {

    diContainer.constructor(userServiceSymbol, {dependency:[userRepositorySymbol,userEntitySymbol,cryptoHandlerSymbol],conn:userService});
    diContainer.constructor(zoneServiceSymbol, {dependency:[zoneRepositorySymbol,zoneEntitySymbol,cryptoHandlerSymbol],conn:zoneService});
    diContainer.constructor(pointServiceSymbol, {dependency:[pointRepositorySymbol,pointEntitySymbol,cryptoHandlerSymbol],conn:pointService});
    diContainer.constructor(picServiceSymbol, {dependency:[picRepositorySymbol,picToolSymbol,picEntitySymbol,cryptoHandlerSymbol],conn:picService});
}



