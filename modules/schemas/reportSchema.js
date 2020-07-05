const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema(
  {
    clientId: {
      type: Schema.ObjectId,
      ref: 'Client',
      autopopulate: {
        select: '_id name',
        maxDepth: 1
      }
    },
    siteId: {
      type: Schema.ObjectId,
      ref: 'Site',
      autopopulate: {
        select: '_id name',
        maxDepth: 1
      }
    },
    totalActiveHours: {
      type: Number,
      required: true
    },
    totalInActiveHours: {
      type: Number,
      required: true
    },
    totalAbsentWorkers: {
      type: Number,
      required: true
    },
    absentWorkers: {
      type: [
        {
          type: Schema.ObjectId,
          ref: 'Worker',
          autopopulate: {
            select: '_id name',
            maxDepth: 1
          }
        }
      ]
    },
    totalLateWorkers: {
      type: Number,
      required: true
    },
    lateWorkers: {
      type: [
        {
          type: Schema.ObjectId,
          ref: 'Worker',
          autopopulate: {
            select: '_id name',
            maxDepth: 1
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

ReportSchema.plugin(require('mongoose-autopopulate'));

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
