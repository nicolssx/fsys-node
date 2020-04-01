const User = require("../model/user")

const userAdd = (fields) => new Promise(resolve=>User.create(fields, (err, result)=>resolve({err, result})))

const userDetail = (fields)=> new Promise(resolve => User.findOne(fields,(err, result)=>resolve({err, result})))

const userList = () => new Promise(resolve=>User.find({},'name token admin createdAt updatedAt', (err, result)=>resolve({err, result})))

const userUpdate = (fields, update) => new Promise(resolve=>User.updateOne(fields, update, (err, result)=>resolve({err, result})))

module.exports = {
  userAdd,
  userList,
  userDetail,
  userUpdate
}
