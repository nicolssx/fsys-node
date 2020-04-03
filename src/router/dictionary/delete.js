const express = require('express')
const {Utils, Service} = require('../../global')
const {dictionaryDelete, dictionaryList} = require('../../dao/dictionary')

const router = express.Router()

router.post('/delete', async (req, res) => {
  // 身份校验
  const {isAdmin} = await Service.authorization(req, res)
  if(!isAdmin){
    res.json(Utils.getResponse(509))
    return
  }

  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'id')){
    return
  }

  // 查询关联子类
  const {result, err} = await dictionaryList({pid: body.id})
  if(!Utils.validDBError(res, err)){
    return
  }
  if(result&&result.length){
    res.json(Utils.getResponse(508))
    return
  }
  const call = await dictionaryDelete({id: body.id})
  if(!Utils.validDBError(res, call.err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
