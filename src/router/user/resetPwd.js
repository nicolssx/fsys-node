const express = require('express')
const {Utils, Service} = require('../../global')
const {userUpdate} = require('../../dao/user')
const router = express.Router()

router.post('/resetPwd', async (req, res) => {
  const {uid, name} = await Service.authorization(req, res) // token、MD5校验
  if(!uid){
    return
  }

  // 校验客户端发送报文
  const body = Utils.getRequire(req, res, 'user', 'resetPwd')
  if(!body){
    return
  }

  let response
  if(name !== body.name){
    response = Utils.getResponse(510)
  } else {
    const {err} = await userUpdate({_id: uid}, {password: body.password}) // 更新密码
    if(!Utils.validDBError(res, err)){
      return
    }
    response = Utils.getResponse(200)
  }
  res.json(response)
})

module.exports = router
