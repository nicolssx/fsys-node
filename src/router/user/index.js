const express = require('express')
const app = express()
const routerName = '/user'
app.use(routerName, require('./login'))
app.use(routerName, require('./resetPwd'))

module.exports = app