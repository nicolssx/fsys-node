const Book = require("../model/book")
const {aggregate} = require('../global/utils')

const bookList = (query) => new Promise(resolve => Book.aggregate(aggregate(query, 'isDefault title icon'), (err, result) => resolve({err, result})))

const bookAdd = (update) => new Promise(resolve => Book.create(update, (err, result) => resolve({err, result})))

const bookUpdate = (update) => new Promise(resolve => Book.updateOne({_id: update.id}, update, (err, result) => resolve({err, result})))

const bookDelete = (query) => new Promise(resolve => Book.deleteOne({_id: query.id}, (err, result) => resolve({err, result})))

module.exports = {
  bookList,
  bookAdd,
  bookUpdate,
  bookDelete
}
