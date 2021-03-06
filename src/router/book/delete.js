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

  const body = Utils.getRequire(req, res, 'book', 'delete')
  if(!body){
    return
  }

  // todo 查询账该id下账单流水置为历史数据

  const {err} = await bookDelete(body)
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
