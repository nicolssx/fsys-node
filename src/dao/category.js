const Category = require("../model/category")
const {aggregate} = require('../global/utils')

const categoryList = (query) => new Promise(resolve => Category.aggregate(aggregate(query, 'pid isDefault title categoryType assetType icon color'), (err, result) => resolve({err, result})))

const categoryAdd = (update) => new Promise(resolve => Category.create(update, (err, result) => resolve({err, result})))

const categoryUpdate = (update) => new Promise(resolve => Category.updateOne({_id: update.id}, update, (err, result) => resolve({err, result})))

const categoryDelete = (query) => new Promise(resolve => Category.deleteOne({_id: query.id}, (err, result) => resolve({err, result})))

const categoryDeleteMany = (query) => new Promise(resolve => Category.deleteMany({pid: query.id}, (err, result) => resolve({err, result})))

module.exports = {
  categoryList,
  categoryAdd,
  categoryUpdate,
  categoryDelete,
  categoryDeleteMany
}
