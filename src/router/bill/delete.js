const express = require('express')
const {Utils, Service} = require('../../global')
const {billDelete} = require('../../dao/bill')

const router = express.Router()

router.post('/delete', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getRequire(req)
  if(!body){
    return
  }

  const {err} = await billDelete(body)
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
