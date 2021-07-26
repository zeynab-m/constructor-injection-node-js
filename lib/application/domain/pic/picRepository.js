'use strict';
const baseClass=require('../utils/crudBaseClass')

module.exports = class extends baseClass {
    constructor() {
        super();
    }

    bulkInsert(pics,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
