const {getResponse, validDBError} = require('./utils')
const {userDetail} = require('../dao/user')

module.exports = class Service {
  // token、MD5校验
  static async authorization(req, res){
    const {authorization} = req.headers
    if(!authorization){
      res.json(getResponse(403))
      return false
    }
    const {err, result} = await userDetail({accessToken: authorization.replace('Bearer ', '')})
    if(!validDBError(res, err)){
      return false
    }
    if(!result){
      res.json(getResponse(403))
      return false
    } else if(!result.refreshToken){
      res.json(getResponse(402))
      return false
    }
    return Object.assign({uid: result._id.toString()}, JSON.parse(JSON.stringify(result)))
  }
}
