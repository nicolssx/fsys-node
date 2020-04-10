const express = require('express')
const {Utils, Service} = require('../../global')
const {dictionaryDelete, dictionaryList} = require('../../dao/dictionary')

const router = express.Router()

router.post('/delete', async (req, res) => {
  // 身份校验
  const {admin} = await Service.authorization(req, res)
  if(!admin){
    res.json(Utils.getResponse(509))
    return
  }

  const body = Utils.getRequire(req, res, 'dictionary', 'delete')
  if(!body){
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
  const call = await dictionaryDelete(body)
  if(!Utils.validDBError(res, call.err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
