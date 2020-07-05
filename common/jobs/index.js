const { CronJob } = require('cron');

const ReportService = require('../../modules/services/reportService');

// Cron job start Every hour
const reportJob = new CronJob('0 * * * *', async () => {
  try {
    console.log('starting cron script');
    await ReportService.generateReports();
  } catch (err) {
    // will be handled
    console.log('we have problem in cron script', err);
  }
});

module.exports = reportJob;
