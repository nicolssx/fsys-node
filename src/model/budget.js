const mongoose = require('mongoose')
const common = require('./common')
const {randomColor} = require('../global/utils')
var Schema = mongoose.Schema

module.exports = mongoose.model('Budget', new Schema({
  uid: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  dateType: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  recordAt: {
    type: Date,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: null
  }
}, common))
