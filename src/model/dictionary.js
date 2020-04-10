const mongoose = require('mongoose')
const common = require('./common')
var Schema = mongoose.Schema

module.exports = mongoose.model('Dictionary', new Schema({
  pid: {
    type: String,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
}, common))
