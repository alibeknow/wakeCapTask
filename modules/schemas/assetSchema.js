const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema } = mongoose;

const AssetSchema = new Schema(
  {
    workerId: {
      type: Schema.ObjectId,
      ref: 'Worker',
      index: true
    },
    clientId: {
      type: Schema.ObjectId,
      ref: 'Client',
      index: true
    },
    siteId: {
      type: Schema.ObjectId,
      ref: 'Site',
      index: true
    },
    location: {
      coordinates: [Number],
      type: {
        type: String,
        default: 'Point'
      }
    },
    isActive: {
      type: Boolean,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

AssetSchema.plugin(idValidator, {
  message: 'Invalid ID value for {PATH}'
});

const Asset = mongoose.model('Asset', AssetSchema);
module.exports = Asset;
