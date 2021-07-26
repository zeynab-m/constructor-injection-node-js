const {userControllerSymbol,zoneControllerSymbol,pointControllerSymbol,homeControllerSymbol}= require('../../infrastructure/config/constant').CONTROLLER
const {userEntitySymbol,permissionEntitySymbol,roleEntitySymbol,zoneEntitySymbol,pointEntitySymbol,picEntitySymbol}= require('../../infrastructure/config/constant').ENTITY
const {userRepositorySymbol,permissionRepositorySymbol,roleRepositorySymbol,zoneRepositorySymbol,pointRepositorySymbol,picRepositorySymbol}= require('../../infrastructure/config/constant').REPOSITORY
const {userServiceSymbol,zoneServiceSymbol,pointServiceSymbol,picServiceSymbol}= require('../../infrastructure/config/constant').SERVICE
const {picToolSymbol}= require('../../infrastructure/config/constant').TOOL
const {cryptoHandlerSymbol}= require('../../infrastructure/config/constant').UTIL

const diContainer = require('./createContainer')

let dependencies={}
dependencies[zoneControllerSymbol]=diContainer.get(zoneControllerSymbol)
dependencies[cryptoHandlerSymbol]=diContainer.get(cryptoHandlerSymbol)
dependencies[userServiceSymbol]=diContainer.get(userServiceSymbol)
dependencies[userControllerSymbol]=diContainer.get(userControllerSymbol)
dependencies[homeControllerSymbol]=diContainer.get(homeControllerSymbol)
dependencies[pointControllerSymbol]=diContainer.get(pointControllerSymbol)
dependencies[roleRepositorySymbol]=diContainer.get(roleRepositorySymbol)
dependencies[permissionRepositorySymbol]=diContainer.get(permissionRepositorySymbol)

module.exports=dependencies