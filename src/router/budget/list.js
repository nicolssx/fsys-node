const express = require('express')
const {Utils, Service} = require('../../global')
const {budgetList} = require('../../dao/budget')

const router = express.Router()

router.post('/list', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }
  const body = Utils.getRequire(req, res, 'budget', 'list')
  if(!body){
    return
  }

  const {err, result} = await budgetList({uid, ...body})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))

})

module.exports = router
