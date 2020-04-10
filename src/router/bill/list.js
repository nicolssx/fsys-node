const express = require('express')
const {Utils, Service} = require('../../global')
const {billList} = require('../../dao/bill')

const router = express.Router()

router.post('/list', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'bookId')){
    return
  }

  const {bookId} = body
  const {err, result} = await billList({uid, bookId})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router
