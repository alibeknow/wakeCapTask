const config = require('../config/config');
const healthCheck = require('../middleware/healthCheck');
const notFoundHandler = require('../middleware/notFoundHandler');
const errorHandler = require('../middleware/errorHandler');
// Route files
const clientRoutes = require('../../modules/routes/client.routes');
const workerRoutes = require('../../modules/routes/worker.routes');
const siteRoutes = require('../../modules/routes/site.routes');
const assetRoutes = require('../../modules/routes/asset.routes');
const reportsRoutes = require('../../modules/routes/report.routes');

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 */
module.exports = (app) => {
  // Mount routers
  app.get(`${config.baseUrl}/health`, healthCheck);
  app.use(`${config.baseUrl}/clients`, clientRoutes);
  app.use(`${config.baseUrl}/workers`, workerRoutes);
  app.use(`${config.baseUrl}/sites`, siteRoutes);
  app.use(`${config.baseUrl}/assets`, assetRoutes);
  app.use(`${config.baseUrl}/reports`, reportsRoutes);

  // Handling Not Found
  app.use(notFoundHandler);

  // Central error handler
  app.use(errorHandler);
};
