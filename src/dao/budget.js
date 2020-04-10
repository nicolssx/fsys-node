const Budget = require("../model/budget")
const {aggregate} = require('../global/utils')

const budgetList = (query) => new Promise(resolve => Budget.aggregate(aggregate(query, 'id categoryId price'), (err, result) => resolve({err, result})))

const budgetAdd = (update) => new Promise(resolve => Budget.create(update, (err, result) => resolve({err, result})))

const budgetUpdate = (update) => new Promise(resolve => Budget.updateOne({_id: update.id}, update, (err, result) => resolve({err, result})))

const budgetDelete = (query) => new Promise(resolve => Budget.deleteOne({_id: query.id}, (err, result) => resolve({err, result})))

module.exports = {
  budgetList,
  budgetAdd,
  budgetUpdate,
  budgetDelete
}
