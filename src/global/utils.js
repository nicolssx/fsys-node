const {RESPONSE_STATUS, MESSAGE_CODE} = require('./constants')

class Utils {

  // 日志
  static log(...arg){
    const t = arg.map(v=>typeof v === 'string'?v:JSON.stringify(v)).join('>>>>>>>>>>')
    console.log('\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(`${new Date()}>>>>>>>>>>${t}`)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n')
  }

  // 客户端发送报文解析
  static getBody(req, rule) {
    // MD5校验
    const body = req.query
    const res = {}
    if(typeof rule === "string") {
      rule = rule.split(' ')
    }
    for(let item of rule){
      if(typeof item === 'string') {
        if(body.hasOwnProperty(item)){
          res[item] = Utils.deepCopy(body[item])
        }
      } else if(Utils.isObject(item)){
        if(body.hasOwnProperty(item.name)){
          const key = item.name
          const val = body[key]
          if(!(item.filterZero && Utils.isZero(val))){
            res[key] = Utils.deepCopy(val)
          }
        }
      }
    }
    return res
  }

  // 客户端发送报文解析并校验
  static getRequire(req, res, moduleName, actionName) {
    Utils.log(req.originalUrl, '接收客户端初始报文成功', req.query)
    const rule = require(`../valid/${moduleName}/${actionName}`)
    const body = Utils.getBody(req, rule)
    Utils.log(req.originalUrl, '解析客户端初始报文成功', body)
    if(!Utils.validRequire(res, body, rule)){
      return false
    }
    return body
  }

  // 客户端返回报文统一格式
  static getResponse(code, data, paramKey) {
    const msg = RESPONSE_STATUS[code]
    const message =  (msg&&msg.replace(/\$/, '：'+paramKey)) || (MESSAGE_CODE[code].replace(/\$/, paramKey) || RESPONSE_STATUS[900])
    const response = {code: msg ? Number(code) : 900, message, data: data || null}
    Utils.log('客户端返回报文', response)
    return response
  }

  static isNull(obj){
    return obj===null || obj===undefined || obj === '' || (!obj&&isNaN(obj))
  }

  static isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  static isZero(obj){
    if(typeof obj === 'string'){

    } else if(typeof obj === 'number'){
      return obj === 0
    } else{
      return false
    }
  }

  static isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  static deepCopy(obj) {
    if(Utils.isNull(obj)){
      return obj
    }
    if(typeof obj === 'object'){
      return JSON.parse(JSON.stringify(obj))
    }
    return obj
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
        if(Utils.isNull(body[item])){
          res.json(Utils.getResponse(501, null, item))
          return false
        }
      } else{
        if(item.required && Utils.isNull(body[item.name])){
          res.json(Utils.getResponse(501, null, item.name))
          return false
        }
      }
    }
    return true
  }

  // 客户端发送报文校验
  // @params res
  // @params body
  // @params rule: Array<string> | Array<{name: string, required: boolean}> | string 校验规则
  static validRequire(res, body, rule){
    if(typeof rule === "string") {
      rule = rule.split(' ')
    }
    for(let item of rule){
      if(typeof item === 'string'){

      } else if(Utils.isObject(item)){
        if(item.required && !body.hasOwnProperty(item.name)){
          res.json(Utils.getResponse(501, null, `缺少${item.name}字段`))
          return false
        } else if(item.notNull && Utils.isNull(body[item.name])) {
          res.json(Utils.getResponse(501, null, `字段${item.name}不能为空`))
          return false
        } else if(item.reg && !item.reg.test(body[item.name])){
          res.json(Utils.getResponse(501, null, `字段${item.name}格式错误：${String(item.reg)}`))
          return false
        }
      } else {
        const err = new Error('validRequire error: item of rule type error>>' + JSON.stringify(rule))
        res.json(err)
        throw err
      }
    }
    return true
  }

  // 数据库操作返回错误校验
  static validDBError(res, err, code){
    if(err){
      res.json(Utils.getResponse(code || 900, null, err))
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
