'use strict';


const errors = require('../../application/domain/utils/errors');

module.exports.authentication = (req, res ,next) => {

  if (req.session) {
    if (req.session.user) return next();
    else {
      return res.redirect("/backOffice/v1/user/login")
    }
  }
}
