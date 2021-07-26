const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../../orm/mongo/config') ;


// let stores={
//     'mongo':
// }
module.exports.setSession = session({
    secret: 'WEMoveOnTrAcksOfNeVerEndIngLighT',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store : new MongoStore({
        url :  config.host(config.dbName),
        collection: 'sessions',
        autoRemove: 'native', // Default
        ttl: 60 * 3600 // 30 minute
    })
});
