const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,    
  },
  description:{
    type: String,
    required: true
  },
  link:{
    type: String
  },
  distance:{
    type: Number
  },
  station:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Station'
  }
});

module.exports = mongoose.model('Place', placeSchema);