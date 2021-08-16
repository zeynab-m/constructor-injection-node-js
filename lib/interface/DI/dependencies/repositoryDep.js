const {userRepositorySymbol,permissionRepositorySymbol,roleRepositorySymbol,zoneRepositorySymbol,pointRepositorySymbol,picRepositorySymbol}= require('../../../infrastructure/config/constant').REPOSITORY
const {userEntitySymbol,permissionEntitySymbol,roleEntitySymbol,zoneEntitySymbol,pointEntitySymbol,picEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const constants = require("../../../infrastructure/config/constant");
const {
    mongoPermissionRepository,
    mongoRoleRepository,
    mongoUserRepository,
    mongoZoneRepository,
    mongoPointRepository,
    mongoPicRepository,

} = require('../../../infrastructure/repository/mongo')
const {
    postgresPointRepository,
    postgresRoleRepository,
    postgresPermissionRepository,
    postgresZoneRepository,
    postgresPicRepository,
    postgresUserRepository,

} = require('../../../infrastructure/repository/postgres')

module.exports=(diContainer)=>{


    switch (process.env.DB_DIALECT){

        case constants.SUPPORTED_DATABASE.MONGO:

            diContainer.constructor(userRepositorySymbol, {dependency:[userEntitySymbol],conn:mongoUserRepository});
            diContainer.constructor(permissionRepositorySymbol, {dependency:[permissionEntitySymbol],conn:mongoPermissionRepository});
            diContainer.constructor(roleRepositorySymbol, {dependency:[roleEntitySymbol],conn:mongoRoleRepository});
            diContainer.constructor(zoneRepositorySymbol, {dependency:[zoneEntitySymbol],conn:mongoZoneRepository});
            diContainer.constructor(pointRepositorySymbol, {dependency:[pointEntitySymbol],conn:mongoPointRepository});
            diContainer.constructor(picRepositorySymbol, {dependency:[picEntitySymbol],conn:mongoPicRepository});
            break;
        case constants.SUPPORTED_DATABASE.POSTGRES:

            diContainer.constructor(userRepositorySymbol, {dependency:[userEntitySymbol],conn:postgresUserRepository});
            diContainer.constructor(permissionRepositorySymbol, {dependency:[permissionEntitySymbol],conn:postgresPermissionRepository});
            diContainer.constructor(roleRepositorySymbol, {dependency:[roleEntitySymbol],conn:postgresRoleRepository});
            diContainer.constructor(zoneRepositorySymbol, {dependency:[zoneEntitySymbol],conn:postgresZoneRepository});
            diContainer.constructor(pointRepositorySymbol, {dependency:[pointEntitySymbol],conn:postgresPointRepository});
            diContainer.constructor(picRepositorySymbol, {dependency:[picEntitySymbol],conn:postgresPicRepository});
            break;

        default:


            diContainer.constructor(userRepositorySymbol, {dependency:[userEntitySymbol],conn:mongoUserRepository});
            diContainer.constructor(permissionRepositorySymbol, {dependency:[permissionEntitySymbol],conn:mongoPermissionRepository});
            diContainer.constructor(roleRepositorySymbol, {dependency:[roleEntitySymbol],conn:mongoRoleRepository});
            diContainer.constructor(zoneRepositorySymbol, {dependency:[zoneEntitySymbol],conn:mongoZoneRepository});
            diContainer.constructor(pointRepositorySymbol, {dependency:[pointEntitySymbol],conn:mongoPointRepository});
            diContainer.constructor(picRepositorySymbol, {dependency:[picEntitySymbol],conn:mongoPicRepository});


    }



}



