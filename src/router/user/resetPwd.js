const express = require('express')
const {Utils, Service} = require('../../global')
const {userUpdate} = require('../../dao/user')
const router = express.Router()

router.post('/resetPwd', async (req, res) => {
  const body = Utils.getBody(req)
  if(!Utils.validRule(res, body, ['password', 'oldPassword'])){ // 校验客户端发送报文
    return
  }
  const {uid, password} = await Service.authorization(req, res) // token、MD5校验
  if(!uid){
    return
  }
  let response
  if(password !== body.oldPassword){ // 密码校验
    response = Utils.getResponse(506)
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