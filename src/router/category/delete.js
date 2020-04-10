const express = require('express')
const {Utils, Service} = require('../../global')
const {categoryDelete, categoryList} = require('../../dao/category')

const router = express.Router()

router.post('/delete', async (req, res) => {
  // 身份校验
  const {uid} = await Service.authorization(req, res)
  if(!uid){
    return
  }

  const body = Utils.getRequire(req, res, 'category', 'delete')
  if(!body){
    return
  }

  // 查询关联子类
  const {result, err} = await categoryList({pid: body.id})
  if(!Utils.validDBError(res, err)){
    return
  }

  if(result&&result.length){
    res.json(Utils.getResponse(508))
    return
  }

  const deleteCall = await categoryDelete(body)
  if(!Utils.validDBError(res, deleteCall.err)){
    return
  }

  res.json(Utils.getResponse(200))
})

module.exports = router
