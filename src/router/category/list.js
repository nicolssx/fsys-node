const express = require('express')
const {Utils, Service} = require('../../global')
const {categoryList} = require('../../dao/category')

const router = express.Router()

router.post('/list', async (req, res) => {
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getRequire(req, res, 'category', 'list')
  if(!body){
    return
  }

  const {err, result} = await categoryList({uid, ...body})
  if(!Utils.validDBError(res, err)){
    return
  }
  res.json(Utils.getResponse(200, result))
})

module.exports = router
