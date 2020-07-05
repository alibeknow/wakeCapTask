const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const SiteSchema = new Schema(
  {
    clientId: {
      type: Schema.ObjectId,
      ref: 'Client',
      autopopulate: {
        select: '_id name',
        maxDepth: 1
      },
      index: true
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Please add a client name'],
      trim: true,
      maxlength: [100, 'Name should be less than 100 characters']
    },
    location: {
      coordinates: [Number],
      type: {
        type: String,
        default: 'Point'
      }
    },
    // Used to manage the timing of the tracked workers against UTC
    timezone: {
      type: String,
      required: true
    },
    // The offset value
    offset: {
      type: String,
      required: true
    },
    // UTC time equivalent to timezone midnight
    UTCEquivalent: {
      type: String,
      required: true
    },
    // Used to figure out the time the workers start their daily operation
    startingHour: {
      type: Number
    },
    // Used to figure out the time the workers end their daily operation
    endingHour: {
      type: Number
    },
    // The configurable value where every worker exceeds will be considered as late attendant
    lateThresholdHour: {
      type: Number
    },
    // The hours that the worker spent in the site leaving the helmet away, or not moving from his place for 5 minutes
    totalInactiveHours: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

SiteSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

SiteSchema.plugin(idValidator, {
  message: 'Invalid ID value for {PATH}'
});

SiteSchema.plugin(require('mongoose-autopopulate'));

const Site = mongoose.model('Site', SiteSchema);
module.exports = Site;
