const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'Please add a client name'],
      trim: true,
      maxlength: [100, 'Name should be less than 100 characters']
    },
    phoneNumber: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      maxlength: [20, 'Phone number should be less than 20 characters']
    },
    email: {
      required: [true, 'Please add an email'],
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid Mail'
      ]
    }
  },
  {
    timestamps: true
  }
);

ClientSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
