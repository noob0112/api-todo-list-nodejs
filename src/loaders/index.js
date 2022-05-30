const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const route = require('../routes');
const config = require('../configs');

module.exports = async ( expressApp ) => {
  await mongooseLoader(config.databaseURL);
  console.log('MongoDB Initialized');

  await expressLoader( expressApp );
  console.log('Express Initialized');

  await route(expressApp );
  console.log('Routes Initialized');
}