module.exports = {
  RESPONSE_STATUS: {
    200: '请求成功',
    402: 'token已过期',
    403: '无效token',
    900: '请求失败$'
  },
  MESSAGE_CODE: {
    400: '登录失败',
    401: '登录失败， 用户名或密码不正确',
    501: '参数错误，$',
    502: '参数错误，$格式错误',
    503: '该用户已存在',
    504: '该用户不存在',
    505: '新密码与旧密码重复',
    506: '旧密码不正确',
    507: 'id不存在',
    508: '删除失败，该类目尚有关联子项目',
    509: '没有操作权限',
    510: '用户名错误',
  },
  CATEGORY_TYPE: {
    1: 'account',
    2: 'category',
    3: 'project',
    4: 'member',
    5: 'merchant',
  },
  ASSET_TYPE: {
    1: 'income',
    2: 'expense'
  },
  DATE_TYPE: {
    1: 'day',
    2: 'week',
    3: 'month',
    4: 'quarter',
    5: 'year'
  }
}
