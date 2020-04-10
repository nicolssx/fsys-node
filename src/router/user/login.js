const express = require('express')
const jwt = require('jsonwebtoken')
const {Utils} = require('../../global')

const {userDetail, userUpdate} = require('../../dao/user')

const router = express.Router()

router.post('/login', async (req, res) => {
  const body = Utils.getRequire(req, res, 'user', 'login')
  if(!body){ // 发送报文校验
    return
  }
  const {err, result} = await userDetail({name: body.name})
  if(!Utils.validDBError(res, err)){
    return
  }
  let response
  if(!result){
    response = Utils.getResponse(401)
  } else{
    const {password, clientId, clientSecret} = body
    if(result.password !== password){ // 校验密码
      response = Utils.getResponse(401)
    } else{
      // 更新token
      const accessToken = jwt.sign({name: clientId}, clientSecret)
      const refreshToken = result.accessToken || accessToken
      response = Utils.getResponse(200, {
        id: result.id,
        name: result.name,
        accessToken,
        refreshToken,
        admin: result.admin
      })
      userUpdate({_id: result.id}, {accessToken, refreshToken})
      setTimeout(()=>{
        userUpdate({_id: result.id}, {refreshToken: ''})
      }, 30*60*1000)
    }
  }
  res.json(response)
})

module.exports = router
