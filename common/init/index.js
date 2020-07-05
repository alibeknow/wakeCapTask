const initRoutes = require('./init-routes');
const connectDB = require('./init-db');
const reportJob = require('../jobs');

/**
 * @function
 * Initializes app components
 *
 * @param {object} app - Express app.
 */
module.exports = (app) => {
  initRoutes(app);
  connectDB();
  reportJob.start();
};
