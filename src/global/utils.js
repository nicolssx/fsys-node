const {RESPONSE_STATUS, MESSAGE_CODE} = require('./constants')

class Utils {
  // 客户端发送报文解析
  static getBody(req) {
    return req.query
  }

  // 客户端返回报文统一格式
  static getResponse(code, data, paramKey) {
    const msg = RESPONSE_STATUS[code]
    const message =  msg || (MESSAGE_CODE[code].replace(/\$/, paramKey) || RESPONSE_STATUS[900])
    return {code: msg ? Number(code) : 900, message, data: data || null}
  }

  // 客户端发送报文校验
  // @params res
  // @params body
  // @params rule: Array<string> | Array<{name: string, required: boolean}> | string 校验规则
  static validRule(res, body, rule){
    if(typeof rule === "string") {
      rule = rule.split(' ')
    }
    for (let item of rule){
      if(typeof item === 'string'){
        if(!body[item]){
          res.json(Utils.getResponse(501, null, item))
          return false
        }
      } else{
        if(item.required && !body[item.name]){
          res.json(Utils.getResponse(501, null, item.name))
          return false
        }
      }
    }
    return true
  }

  // 数据库操作返回错误校验
  static validDBError(res, err, code){
    if(err){
      res.json(Utils.getResponse(code || 900))
      return false
    }
    return true
  }

  // model.aggregate统一配置
  // @params query: Object
  // @params fields: String
  static aggregate(query, fields){
    let f = {}
    fields.split(' ').map(item=>{
      f[item] = 1
      return item
    })
    return [{$match: query},{$project: Object.assign(f, {id: '$_id', _id: 0})}]
  }

  // 获取随机颜色
  static randomColor(){
    return '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
  }
}

module.exports = Utils
