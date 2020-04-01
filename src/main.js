const config = require('../config')

// express
const express = require('express')
const app = express()

// cors
const cors = require('cors')
app.use(cors())

// body-parser HTTP请求主体解析中间件
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// morgan HTTP请求记录器中间件
const morgan = require('morgan')
app.use(morgan('dev'))


// mongoose 数据库
const mongoose = require('mongoose')
mongoose.connect(config.dataBase, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
const db = mongoose.connection
db.on('error', function(err){
  console.log(`\x1B[40;31m${config.dataBase} connection error: \x1B[0m`, err)
})
db.once('open', function(){
  console.log(`\x1B[40;32m${config.dataBase} connection success\x1B[0m`)
})

// 监听服务
const port = config.devServer.port
app.listen(port, ()=>{
  console.clear()
  console.log(`\x1B[40;32mServer running at http://localhost:${port}\x1B[0m`)
})

// 路由
app.use(`/${config.apiNameSpace}`, require('./router/user'))
app.use(`/${config.apiNameSpace}`, require('./router/dictionary'))
app.use(`/${config.apiNameSpace}`, require('./router/category'))

module.exports = app