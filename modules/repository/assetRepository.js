const AssetSchema = require('../schemas/assetSchema');
const BaseRepository = require('./baseRepository');

/** Class representing a Asset model. */
class Asset extends BaseRepository {
  /**
   * @method constructor
   * @param {object} model
   */
  /**
   * @constructor
   */
  constructor() {
    super(AssetSchema);
  }
}

module.exports = new Asset();
