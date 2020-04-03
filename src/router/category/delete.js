const express = require('express')
const {Utils, Service} = require('../../global')
const {categoryDelete, categoryList} = require('../../dao/category')

const router = express.Router()

router.post('/delete', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, 'id')){
    return
  }
  const {uid} = await Service.authorization(req, res)
  if(!uid){
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
  // 查询关联流水
  // todo 删除子类：流水移动到父类下；删除父类：流水移动到默认分组；
  const deleteCall = await categoryDelete(body)
  if(!Utils.validDBError(res, deleteCall.err)){
    return
  }
  res.json(Utils.getResponse(200))
})

module.exports = router
