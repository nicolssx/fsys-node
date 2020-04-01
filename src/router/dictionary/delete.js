const express = require('express')
const {Utils} = require('../../global')
const {dictionaryDelete, dictionaryList} = require('../../dao/dictionary')

const router = express.Router()

router.post('/delete', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'id')){
    return
  }
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