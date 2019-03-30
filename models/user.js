const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: true 
    },
    last: { 
      type: String,
      required: true 
    }
  },
  bookedTickets: {
    type: [Object]
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);