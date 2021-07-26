'use strict';
const crudBaseClass = require('../../utils/crudBaseClass');


module.exports = class extends crudBaseClass{
    constructor() {
        super();
    }

    findByTitle(username,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    createRoles(permissions,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getUserRoles(roles,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }


};
