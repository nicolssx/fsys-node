const express = require('express')
const {Utils} = require('../../global')
const {dictionaryAdd, dictionaryUpdate} = require('../../dao/dictionary')

const router = express.Router()

router.post('/edit', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'title type')){
    return
  }
  if(body.id){
    const {err} = await dictionaryUpdate(body)
    if(!Utils.validDBError(res, err, 507)){
      return
    }
    res.json(Utils.getResponse(200))
  } else {
    const {err} = await dictionaryAdd(body)
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }
})

module.exports = router