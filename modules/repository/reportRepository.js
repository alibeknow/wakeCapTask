const ReportSchema = require('../schemas/reportSchema');
const BaseRepository = require('./baseRepository');

/** Class representing a Report model. */
class Report extends BaseRepository {
  /**
   * @method constructor
   * @param {object} model
   */
  /**
   * @constructor
   */
  constructor() {
    super(ReportSchema);
  }
}

module.exports = new Report();
