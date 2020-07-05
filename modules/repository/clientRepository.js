const ClientSchema = require('../schemas/clientSchema');
const BaseRepository = require('./baseRepository');

/** Class representing a Client model. */
class Client extends BaseRepository {
  /**
   * @method constructor
   * @param {object} model
   */
  /**
   * @constructor
   */
  constructor() {
    super(ClientSchema);
  }
}

module.exports = new Client();
