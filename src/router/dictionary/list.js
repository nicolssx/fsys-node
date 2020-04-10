const express = require('express')
const {Utils, Service} = require('../../global')
const {dictionaryList} = require('../../dao/dictionary')

const router = express.Router()

router.post('/list', async (req, res) => {
  const body = Utils.getRequire(req, res, 'dictionary', 'list')
  if(!body){
    return
  }
  const {err, result} = await dictionaryList(body)
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router
