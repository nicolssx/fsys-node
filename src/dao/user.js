const User = require("../model/user")

const userAdd = (update) => new Promise(resolve=>User.create(update, (err, result)=>resolve({err, result})))

const userDetail = (query)=> new Promise(resolve => User.findOne(query,(err, result)=>resolve({err, result})))

const userList = () => new Promise(resolve=>User.find({},'name token admin createdAt updatedAt', (err, result)=>resolve({err, result})))

const userUpdate = (query, update) => new Promise(resolve=>User.updateOne(query, update, (err, result)=>resolve({err, result})))

module.exports = {
  userAdd,
  userList,
  userDetail,
  userUpdate
}
