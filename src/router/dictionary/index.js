const express = require('express')
const app = express()
const routerName = '/dictionary'
app.use(routerName, require('./edit'))
app.use(routerName, require('./list'))
app.use(routerName, require('./delete'))

module.exports = app