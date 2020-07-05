const { CREATED } = require('http-status-codes');
const moment = require('moment-timezone');

const asyncHandler = require('../../../common/middleware/async');
const Site = require('../../schemas/siteSchema');

// @desc      Add site
// @route     POST /api/v0/sites
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const {
    clientId,
    name,
    coordinates,
    timezone,
    startingHour,
    endingHour,
    lateThresholdHour,
    totalInactiveHours
  } = req.body;

  const UTCEquivalent = moment
    .tz(timezone)
    .set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    })
    .utc()
    .format('LT');

  const offset = moment.tz(timezone).format('Z');

  await Site.create({
    clientId,
    name,
    location: {
      coordinates,
      type: 'Point'
    },
    timezone,
    offset,
    UTCEquivalent,
    startingHour,
    endingHour,
    lateThresholdHour,
    totalInactiveHours
  });

  return res.status(CREATED).json({
    success: true,
    message: 'Site added successfully',
    data: null
  });
});
