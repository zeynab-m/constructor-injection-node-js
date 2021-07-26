'use strict'

module.exports={

    SUPPORTED_DATABASE:{

        MONGO: 'mongo',

    },
    CONTROLLER:{

        userControllerSymbol: 'userController',
        zoneControllerSymbol: 'zoneController',
        pointControllerSymbol: 'pointController',
        homeControllerSymbol: 'homeController',

    },
    ENTITY:{

        userEntitySymbol: 'userEntity',
        permissionEntitySymbol: 'permissionEntity',
        roleEntitySymbol: 'roleEntity',
        zoneEntitySymbol: 'zoneEntity',
        pointEntitySymbol: 'pointEntity',
        picEntitySymbol: 'picEntity',

    },
    REPOSITORY:{

        userRepositorySymbol: 'userRepository',
        permissionRepositorySymbol: 'permissionRepository',
        roleRepositorySymbol: 'roleRepository',
        zoneRepositorySymbol: 'zoneRepository',
        pointRepositorySymbol: 'pointRepository',
        picRepositorySymbol: 'picRepository',

    },
    SERVICE:{

        userServiceSymbol: 'userService',
        zoneServiceSymbol: 'zoneService',
        pointServiceSymbol: 'pointService',
        picServiceSymbol: 'picService',

    },
    TOOL:{

        picToolSymbol: 'picTool',

    },
    UTIL:{

        cryptoHandlerSymbol: 'cryptoHandler',

    },


}
