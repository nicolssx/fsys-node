const express = require('express')
const {Utils, Service} = require('../../global')
const {bookAdd, bookUpdate} = require('../../dao/book')

const router = express.Router()

router.post('/edit', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getRequire(req, res, 'book', 'edit')
  if(!body){
    return
  }

  if(body.id){
    const {err} = await bookUpdate(body)
    if(!Utils.validDBError(res, err, 507)){
      return
    }
    res.json(Utils.getResponse(200))
  } else {
    const {err} = await bookAdd({uid, ...body})
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }
})

module.exports = router
