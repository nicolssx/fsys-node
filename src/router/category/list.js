const express = require('express')
const {Utils, Service} = require('../../global')
const {categoryList} = require('../../dao/category')

const router = express.Router()

router.post('/list', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'type')){
    return
  }
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }
  const {err, result} = await categoryList({type: body.type, uid})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router