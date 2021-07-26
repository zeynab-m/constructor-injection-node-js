const errors = require('../../../application/domain/utils/errors');
module.exports = function(app) {

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(new errors.PageNotFound());
    });

    app.use(function(err, req, res, next){
        if (err instanceof errors.AppError) {
            next(err)
        } else {
            next(new errors.InternalServerError(err))
        }
    })

    // error handler
    app.use(function(err, req, res, next) {
        if(err instanceof errors.PageNotFound){
             return res.render('errors/404')
        }
        // if(err instanceof errors.InternalServerError){
        //      return res.render('errors/500')
        // }
        res.status(err.code);
        res.json({
            ...req.json,
            result:false,
            error:{
                code: err.code,
                message: err.message,
                data: err.data,
                stack: err.stack,
                meta: {
                    url: req.url,
                    body: req.body,
                    params: req.params,
                    query: req.query
            }

            }
        });

    });

};
