const express = require('express')
const {Utils, Service} = require('../../global')
const {dictionaryList} = require('../../dao/dictionary')

const router = express.Router()

router.post('/list', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'type')){
    return
  }
  const {err, result} = await dictionaryList({type: body.type})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router
