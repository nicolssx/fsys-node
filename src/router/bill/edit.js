const express = require('express')
const {Utils, Service} = require('../../global')
const {billAdd, billUpdate} = require('../../dao/bill')

const router = express.Router()

router.post('/edit', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'accountId categoryIds memberIds extendIds recordAt assetType price images remark')){
    return
  }

  const {id, accountId, categoryIds, memberIds, extendIds, recordAt, assetType, price, images, remark} = body
  if(id){
    const {err} = await billUpdate({id, uid, accountId, categoryIds, memberIds, extendIds, recordAt, assetType, price, images, remark})
    if(!Utils.validDBError(res, err, 507)){
      return
    }
    res.json(Utils.getResponse(200))
  } else {
    const {err} = await billAdd({uid, accountId, categoryIds, memberIds, extendIds, recordAt, assetType, price, images, remark})
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }
})

module.exports = router
