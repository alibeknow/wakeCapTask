const moment = require('moment-timezone');
const _ = require('lodash');

const Report = require('../repository/reportRepository');
const Site = require('../repository/siteRepository');
const Worker = require('../repository/workerRepository');
const Asset = require('../repository/assetRepository');

/**
 * @function
 * Returns all sites based on UTC equivalent
 *
 * @returns {Promise<Array>} - Promise object represents the returned documents.
 */
async function _getAllSites() {
  const UTCEquivalent = moment().format('LT');

  const conditions = {
    UTCEquivalent
  };
  const fields = {
    _id: 1,
    clientId: 1,
    startingHour: 1,
    endingHour: 1,
    lateThresholdHour: 1
  };
  return Site.findAll(conditions, fields);
}

/**
 * @function
 * Returns all active workers for site from asset
 *
 * @param {String} siteId - Specifies workers site.
 *
 * @returns {Promise<Array>} - Promise object represents the returned documents.
 */
async function _getActiveWorkersBySiteId(siteId) {
  const start = new Date(moment().subtract(1, 'days'));
  const end = new Date();
  const conditions = {
    siteId,
    createdAt: {
      $gte: start,
      $lte: end
    }
  };
  const field = 'workerId';
  const result = await Asset.distinct(field, conditions);
  return result;
}

/**
 * @function
 * Returns all absent workers for site
 *
 * @param {String} siteId - Specifies workers site.
 *
 * @returns {Promise<Array>} - Promise object represents the returned documents.
 */
async function _getAbsentSiteWorkers(siteId) {
  const activeWorkers = await _getActiveWorkersBySiteId(siteId);
  const conditions = {
    siteId,
    _id: {
      $nin: activeWorkers
    }
  };
  const fields = {
    _id: 1
  };
  return Worker.findAll(conditions, fields);
}

/**
 * @function
 * Returns all late workers for site from asset
 *
 * @param {String} siteId - Specifies workers site.
 *
 * @returns {Promise<Array>} - Promise object represents the returned documents.
 */
async function _getSiteLateWorkers(siteId, startingHour, lateThresholdHour) {
  const hour = startingHour + lateThresholdHour;
  const minute = +(hour % 1).toFixed(2) * 60;
  const start = new Date(
    moment()
      .subtract(1, 'days')
      .set({
        hour,
        minute,
        millisecond: 0
      })
  );
  const end = new Date();

  // Find the first log after the threshold hour with duration 0 indicating the arrival of the worker
  const conditions = {
    duration: 0,
    siteId,
    createdAt: {
      $gte: start,
      $lte: end
    }
  };
  const field = 'workerId';
  const result = await Asset.distinct(field, conditions);
  return result;
}

/**
 * @function
 * Returns all late workers for site from asset
 *
 * @param {String} siteId - Specifies workers site.
 *
 * @returns {Promise<Array>} - Promise object represents the returned documents.
 */
async function _getSiteWorkersTotalHours(siteId, isActive) {
  const start = new Date(moment().subtract(1, 'days'));
  const end = new Date();
  const aggregations = [
    {
      $match: {
        siteId,
        isActive,
        createdAt: {
          $gte: start,
          $lte: end
        }
      }
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$duration'
        }
      }
    }
  ];
  const result = await Asset.aggregate(aggregations);
  const totalHours = result.length
    ? (+_.get(result[0], 'total', 0) / 3600).toFixed(2)
    : 0;
  return +totalHours;
}

/** Class representing a Report service. */
class ReportService {
  /**
   * @function
   * Generates reports for sites
   *
   */
  static async generateReports() {
    const sites = await _getAllSites();
    for (const site of sites) {
      const { _id, startingHour, lateThresholdHour, clientId } = site;
      const [
        absentWorkers,
        totalActiveHours,
        totalInActiveHours,
        lateWorkers
      ] = await Promise.all([
        _getAbsentSiteWorkers(_id),
        _getSiteWorkersTotalHours(_id, true),
        _getSiteWorkersTotalHours(_id, false),
        _getSiteLateWorkers(_id, startingHour, lateThresholdHour)
      ]);

      await Report.create({
        clientId,
        siteId: _id,
        totalAbsentWorkers: absentWorkers.length,
        absentWorkers: absentWorkers.map((x) => x._id),
        totalActiveHours,
        totalInActiveHours,
        totalLateWorkers: lateWorkers.length,
        lateWorkers
      });
    }
  }
}

module.exports = ReportService;
