'use strict';

const crudBaseClass = require('../../utils/crudBaseClass');


module.exports = class extends crudBaseClass{

    constructor() {
        super();
    }


    findUserByUserName({dbName,username}) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    hashPassword({password}) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    createRoles({permissions,dbName}) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }


};
