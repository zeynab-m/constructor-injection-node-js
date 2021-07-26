'use strict';
const baseClass=require('../utils/crudBaseClass')

module.exports = class extends baseClass {

    async getPoints(dbName){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
};
