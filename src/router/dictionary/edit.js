const express = require('express')
const {Utils, Service} = require('../../global')
const {dictionaryAdd, dictionaryUpdate} = require('../../dao/dictionary')

const router = express.Router()

router.post('/edit', async (req, res) => {
  // 身份校验
  const {admin} = await Service.authorization(req, res)
  if(!admin){
    res.json(Utils.getResponse(509))
    return
  }

  const body = Utils.getRequire(req, res, 'dictionary', 'edit')
  if(!body){
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
