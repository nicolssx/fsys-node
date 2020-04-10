const mongoose = require('mongoose')
const common = require('./common')
const {randomColor} = require('../global/utils')
var Schema = mongoose.Schema

module.exports = mongoose.model('Category', new Schema({
  pid: {
    type: String,
    default: null
  },
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
  categoryType: {
    type: String,
    required: true
  },
  assetType: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: randomColor
  }
}, common))
