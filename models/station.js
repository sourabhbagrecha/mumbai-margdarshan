const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String
  },
  isMajor: {
    type: Boolean,
    required: true
  },
  arrival: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  isCentral: {
    type: Boolean,
    required: true
  },
  isHarbour: {
    type: Boolean,
    required: true
  },
  isWestern: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Station', stationSchema);