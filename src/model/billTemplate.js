const mongoose = require('mongoose')
const common = require('./common')
const {randomColor} = require('../global/utils')
var Schema = mongoose.Schema

module.exports = mongoose.model('BillTemplate', new Schema({
  uid: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    default: ''
  },
  categoryIds: {
    type: [String],
    required: true
  },
  memberIds: {
    type: [String],
    required: true
  },
  extendIds: {
    type: [{type: String, ids: [String]}],
    default: null
  },
  inOut: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: String,
    default: null
  },
  remark: {
    type: String,
    default: null
  }
}, common))
