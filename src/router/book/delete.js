const express = require('express')
const {Utils, Service} = require('../../global')
const {bookDelete} = require('../../dao/book')

const router = express.Router()

router.post('/delete', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'id')){
    return
  }

  // todo 查询账该id下账单流水并删除

  const call = await bookDelete({id: body.id})
  if(!Utils.validDBError(res, call.err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
