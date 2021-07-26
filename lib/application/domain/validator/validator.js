const Joi=require('joi')

module.exports.validate=function (data, schema) {

    const result = schema.validate(data, {

        abortEarly: false
    });
    if (result.error) throw new Error(result.error);
    return result.value;
}
