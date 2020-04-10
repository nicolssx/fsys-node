const express = require('express')
const {Utils, Service} = require('../../global')
const {budgetList, budgetAdd, budgetUpdate} = require('../../dao/budget')

const router = express.Router()

router.post('/edit', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }
  const body = Utils.getRequire(req, res, 'budget', 'edit')
  if(!body){
    return
  }

  const {id, accountId, dateType, assetType, pid, categoryId, price} = body
  if(id){ // edit
    const {err} = await budgetUpdate({id, price})
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  } else{ // add
    const {err} = await budgetAdd({accountId, dateType, assetType, pid, categoryId, price})
    if(!Utils.validDBError(res, err)){
      return
    }
    res.json(Utils.getResponse(200))
  }

})

module.exports = router
