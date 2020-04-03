const express = require('express')
const {Utils, Service} = require('../../global')
const {bookList} = require('../../dao/book')

const router = express.Router()

router.post('/list', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'type')){
    return
  }

  const {err, result} = await bookList({uid})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router
