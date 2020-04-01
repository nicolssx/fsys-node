const mongoose = require('mongoose')
const common = require('./common')
const {randomColor} = require('../global/utils')
var Schema = mongoose.Schema

module.exports = mongoose.model('Category', new Schema({
  pid: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: randomColor
  },
  uid: {
    type: String,
    required: true
  },
}, common))