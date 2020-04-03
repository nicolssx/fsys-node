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

  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'title')){
    return
  }

  const {id, title, icon, isDefault} = body
  if(id){
    const {err} = await bookUpdate({id, title, icon, isDefault, uid})
    if(!Utils.validDBError(res, err, 507)){
      return
    }
    res.json(Utils.getResponse(200))
  } else {
    const {err} = await bookAdd({title, icon, isDefault})
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }
})

module.exports = router
