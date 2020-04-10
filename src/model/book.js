const mongoose = require('mongoose')
const common = require('./common')
var Schema = mongoose.Schema

module.exports = mongoose.model('Book', new Schema({
  uid: {
    type: String,
    required: true
  },
  isDefault: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  }
}, common))
