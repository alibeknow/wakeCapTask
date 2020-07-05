const WorkerSchema = require('../schemas/workerSchema');
const BaseRepository = require('./baseRepository');
/** Class representing a Worker model. */
class Worker extends BaseRepository {
  /**
   * @method constructor
   * @param {object} model
   */
  /**
   * @constructor
   */
  constructor() {
    super(WorkerSchema);
  }
}

module.exports = new Worker();
