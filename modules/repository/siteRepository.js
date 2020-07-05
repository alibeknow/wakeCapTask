const SiteSchema = require('../schemas/siteSchema');
const BaseRepository = require('./baseRepository');

/** Class representing a Site model. */
class Site extends BaseRepository {
  /**
   * @method constructor
   * @param {object} model
   */
  /**
   * @constructor
   */
  constructor() {
    super(SiteSchema);
  }
}

module.exports = new Site();
