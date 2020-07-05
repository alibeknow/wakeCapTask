const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const WorkerSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [100, 'Name should be less than 100 characters']
    },
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
    }
  },
  {
    timestamps: true
  }
);

WorkerSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

WorkerSchema.plugin(require('mongoose-autopopulate'));

const Worker = mongoose.model('Worker', WorkerSchema);
module.exports = Worker;
