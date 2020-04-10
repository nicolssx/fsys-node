const express = require('express')
const app = express()
const routerName = '/account'
app.use(routerName, require('./edit'))
app.use(routerName, require('./list'))

module.exports = app
