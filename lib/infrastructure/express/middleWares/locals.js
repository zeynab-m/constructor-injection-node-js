
module.exports = (req, res, next) => {

    res.locals.flash = (key) => {
        if (!req.session || !req.session[key]) {
            return [];
        }
        const data = req.session && req.session[key];
        req.session[key] = null;
        return data;
    }
    res.locals.user = req.session ? req.session.user : {};
    next();
}
