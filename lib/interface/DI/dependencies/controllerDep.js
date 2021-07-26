const {userControllerSymbol,zoneControllerSymbol,pointControllerSymbol,homeControllerSymbol}= require('../../../infrastructure/config/constant').CONTROLLER
const {userServiceSymbol,zoneServiceSymbol,pointServiceSymbol,picServiceSymbol}= require('../../../infrastructure/config/constant').SERVICE
const {expressUserController}= require('../../../infrastructure/express/controllers/user')
const {expressZoneController}= require('../../../infrastructure/express/controllers/zone')
const {expressPointController}= require('../../../infrastructure/express/controllers/point')
const {expressHomeController}= require('../../../infrastructure/express/controllers/home')

module.exports=(diContainer)=> {

    diContainer.constructor(userControllerSymbol, {dependency:[userServiceSymbol],conn:expressUserController});
    diContainer.constructor(zoneControllerSymbol, {dependency:[zoneServiceSymbol],conn:expressZoneController});
    diContainer.constructor(pointControllerSymbol, {dependency:[pointServiceSymbol,picServiceSymbol],conn:expressPointController});
    diContainer.constructor(homeControllerSymbol, {dependency:[pointServiceSymbol],conn:expressHomeController});
}



