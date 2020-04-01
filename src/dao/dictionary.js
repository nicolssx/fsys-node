const Dictionary = require("../model/dictionary")
const {aggregate} = require('../global/utils')

const dictionaryList = (query) => new Promise(resolve => Dictionary.aggregate(aggregate(query, 'title type pid'), (err, result) => resolve({err, result})))

const dictionaryAdd = (update) => new Promise(resolve => Dictionary.create(update, (err, result) => resolve({err, result})))

const dictionaryUpdate = (update) => new Promise(resolve => Dictionary.updateOne({_id: update.id}, update, (err, result) => resolve({err, result})))

const dictionaryDelete = (query) => new Promise(resolve => Dictionary.deleteOne({_id: query.id}, (err, result) => resolve({err, result})))

module.exports = {
  dictionaryList,
  dictionaryAdd,
  dictionaryUpdate,
  dictionaryDelete
}