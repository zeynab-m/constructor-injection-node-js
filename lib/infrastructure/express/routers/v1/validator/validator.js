const Joi = require('joi');

exports.body = function(schema) {
    return async function(req, res, next) {
        try {

            const santized = validate(req.body, schema);
            req.body = santized;
            next();

        } catch (err) {
            next(err)
        }
    }
};

exports.query = function(schema) {
    return async function(req, res, next) {
        try {

            const santized = validate(req.query, schema);
            req.query = santized;
            next();

        } catch (err) {
            next(err)
        }
    }
};

exports.params = function(schema) {
    return async function(req, res, next) {
        try {

            const santized = validate(req.params, schema);
            req.params = santized;
            next();

        } catch (err) {
            next(err)
        }
    }
};

function validate(data, schema) {
    // const result = Joi.validate(data, schema, {
    const result = schema.validate(data, {

        abortEarly: false
    });
    if (result.error) throw new Error(result.error);
    return result.value;
};
