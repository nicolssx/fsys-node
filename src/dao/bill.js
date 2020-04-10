const Bill = require("../model/bill")
const {aggregate} = require('../global/utils')

const billList = (query) => new Promise(resolve => Bill.aggregate(aggregate(query, 'accountId categoryIds memberIds extendIds recordAt assetType price images remark'), (err, result) => resolve({err, result})))

const billAdd = (update) => new Promise(resolve => Bill.create(update, (err, result) => resolve({err, result})))

const billUpdate = (update) => new Promise(resolve => Bill.updateOne({_id: update.id}, update, (err, result) => resolve({err, result})))

const billDelete = (query) => new Promise(resolve => Bill.deleteOne({_id: query.id}, (err, result) => resolve({err, result})))

module.exports = {
  billList,
  billAdd,
  billUpdate,
  billDelete
}
