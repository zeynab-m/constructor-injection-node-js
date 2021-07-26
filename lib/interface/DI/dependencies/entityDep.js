const {userEntitySymbol,permissionEntitySymbol,roleEntitySymbol,zoneEntitySymbol,pointEntitySymbol,picEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const {cryptoHandlerSymbol}= require('../../../infrastructure/config/constant').UTIL
const {userEntity}= require('../../../application/domain/user/user/userEntity')
const {roleEntity}= require('../../../application/domain/user/role/roleEntity')
const {permissionEntity}= require('../../../application/domain/user/permission/permissionEntity')
const {zoneEntity}= require('../../../application/domain/zone/zoneEntity')
const {pointEntity}= require('../../../application/domain/point/pointEntity')
const {picEntity}= require('../../../application/domain/pic/picEntity')

module.exports=(diContainer)=> {

    diContainer.constructor(userEntitySymbol, {dependency:[cryptoHandlerSymbol],conn:userEntity});
    diContainer.constructor(permissionEntitySymbol, {dependency:[],conn:permissionEntity});
    diContainer.constructor(roleEntitySymbol, {dependency:[],conn:roleEntity});
    diContainer.constructor(zoneEntitySymbol, {dependency:[],conn:zoneEntity});
    diContainer.constructor(pointEntitySymbol, {dependency:[],conn:pointEntity});
    diContainer.constructor(picEntitySymbol, {dependency:[],conn:picEntity});

}



