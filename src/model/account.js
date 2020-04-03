const mongoose = require('mongoose')
const common = require('./common')
const {randomColor} = require('../global/utils')
var Schema = mongoose.Schema

module.exports = mongoose.model('Category', new Schema({
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
  income: {
    type: Number,
    default: 0
  },
  expense: {
    type: Number,
    default: 0
  }
}, common))
