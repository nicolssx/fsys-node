const mongoose = require('mongoose')
const common = require('./common')
var Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  accessToken: {
    type: String,
    default: null
  },
  refreshToken: {
    type: String,
    default: null
  }
}, common))