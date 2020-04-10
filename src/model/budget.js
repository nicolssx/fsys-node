const mongoose = require('mongoose')
const common = require('./common')
var Schema = mongoose.Schema

module.exports = mongoose.model('Budget', new Schema({
  uid: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    default: 0
  },
  accountId: {
    type: String,
    required: true
  },
  dateType: {
    type: Number,
    required: true
  },
  assetType: {
    type: Number,
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
