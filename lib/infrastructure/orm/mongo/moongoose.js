const mongoose          = require('mongoose');
// const config            = require('@metal/models').config ;
// const schemas           = require('@metal/models').Schemas;
const connections       = {};


// module.exports.runMongo= async function () {
//
//     const options = {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//         reconnectInterval: 500, // Reconnect every 500ms
//         poolSize: 3, // Maintain up to 10 socket connections
//         // If not connected, return errors immediately rather than waiting for reconnect
//         bufferMaxEntries: 0,
//         connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
//         socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//         family: 4 // Use IPv4, skip trying IPv6
//     };
//
//     mongoose.connect(config.db_conn('eplus_projects'), options, function() {
//         console.log('mongodb connected')
//     });
//
//     mongoose.connection.on('connected',async function () {
//         console.log('Mongoose default connection open to %s ', mongoose.connection.db.databaseName);
//
//         for (let schema in schemas) {
//             mongoose.connection.model(schema, schemas[schema])
//         }
//
//
//     });
//
//     mongoose.connection.on('error',function (err) {
//         console.log('Mongoose default connection error: %s ',  err);
//     });
//
//     mongoose.connection.on('disconnected', function () {
//         console.log('Mongoose default connection disconnected');
//     });
//
//     mongoose.connection.on('open', function () {
//         // new mongoose.mongo.Admin(mongoose.connection.db).listDatabases(function(err, result) {
//         //     global.databases = result.databases.geoCoding(d => d.name);
//         // });
//         console.log('Mongoose default connection is open');
//     });
//
//     process.on('SIGINT', function() {
//         for (let project_name in connections) {
//
//             connections[project_name].close(function () {
//
//                 console.log(`Mongoose ${project_name} connection disconnected through app termination`);
//
//             })
//
//         }
//         process.exit(0);
//
//     });
//
//
//     module.exports.getProjectConnection = function (project_name) {
//
//         // console.log(Object.keys(connections), project_name, new Error().stack);
//
//
//         if(project_name == "undefined" || project_name == "undefined_db"){
//
//
//         }
//         if (connections[project_name]) {
//
//             return connections[project_name];
//
//
//         } else {
//
//             return connections[project_name] = mongoose.createConnection(config.db_conn(project_name), {poolSize:3, useNewUrlParser: true});
//
//
//         }
//
//     };
// }
