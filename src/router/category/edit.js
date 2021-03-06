const express = require('express')
const {Utils, Service} = require('../../global')
const {categoryAdd, categoryUpdate} = require('../../dao/category')

const router = express.Router()

router.post('/edit', async (req, res) => {

  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getRequire(req, res, 'category', 'edit')
  if(!body){
    return
  }

  if(body.id){
    const {err} = await categoryUpdate(body)
    if(!Utils.validDBError(res, err, 507)){
      return
    }
    res.json(Utils.getResponse(200))
  } else {
    const {err} = await categoryAdd(Object.assign(body, {uid}))
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }
})

module.exports = router
