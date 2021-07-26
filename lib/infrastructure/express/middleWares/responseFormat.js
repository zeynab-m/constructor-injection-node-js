module.exports.responseFormat = (req, res, next) => {
    req.json = {
        result:true,
        error:{},
        data:{}

    }
    next();
}
