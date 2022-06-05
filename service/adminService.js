/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-05 16:28:40
 * @LastEditors: your name
 * @Description: admin 业务逻辑层
 */

const md5 = require('md5')
const { loginDao } = require('../dao/adminDao')

module.exports.loginService = async function (loginInfo) {
  console.log('loginInfo', loginInfo);
  loginInfo.loginPwd = md5(loginInfo.loginPwd)
  // 数据验证
  let data = await loginDao(loginInfo)
  console.log('data', data);
  if (data && data.dataValues) {
    // 添加token

  }
  return { data }
}