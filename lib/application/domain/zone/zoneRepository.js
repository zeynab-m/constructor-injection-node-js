'use strict';
const baseClass=require('../utils/crudBaseClass')

module.exports = class extends baseClass {
    constructor() {
        super();
    }

    getAreas(dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    delete(id,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    checkIntersection(coordinates,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
