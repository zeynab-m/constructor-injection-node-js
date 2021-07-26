const errors = require('../../../application/domain/utils/errors');

module.exports.addDbName = function (req, res, next) {
    try {
        let en_name = req.get('project') || (req.user && req.user.project.en_name || req.body.project) || 'location';

        const dbName =(en_name != undefined)? `${en_name}_db`:undefined;

        req.dbName = dbName;
        req.project = en_name;
        next();
    } catch (e) {
        console.error('point name not found');
        next(e)
    }
};
