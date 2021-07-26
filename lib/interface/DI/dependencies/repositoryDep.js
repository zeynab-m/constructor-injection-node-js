const {userRepositorySymbol,permissionRepositorySymbol,roleRepositorySymbol,zoneRepositorySymbol,pointRepositorySymbol,picRepositorySymbol}= require('../../../infrastructure/config/constant').REPOSITORY
const {userEntitySymbol,permissionEntitySymbol,roleEntitySymbol,zoneEntitySymbol,pointEntitySymbol,picEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const {
    mongoPermissionRepository,
    mongoRoleRepository,
    mongoUserRepository,
    mongoZoneRepository,
    mongoPointRepository,
    mongoPicRepository,

} = require('../../../infrastructure/repository/mongo')

module.exports=(diContainer)=>{

    diContainer.constructor(userRepositorySymbol, {dependency:[userEntitySymbol],conn:mongoUserRepository});
    diContainer.constructor(permissionRepositorySymbol, {dependency:[permissionEntitySymbol],conn:mongoPermissionRepository});
    diContainer.constructor(roleRepositorySymbol, {dependency:[roleEntitySymbol],conn:mongoRoleRepository});
    diContainer.constructor(zoneRepositorySymbol, {dependency:[zoneEntitySymbol],conn:mongoZoneRepository});
    diContainer.constructor(pointRepositorySymbol, {dependency:[pointEntitySymbol],conn:mongoPointRepository});
    diContainer.constructor(picRepositorySymbol, {dependency:[picEntitySymbol],conn:mongoPicRepository});
}


