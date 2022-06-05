/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-05 16:24:25
 * @LastEditors: your name
 * @Description: 负责和数据库打交道
 */

const adminModel = require('./model/adminModel')

// 登录
module.exports.loginDao = async function (loginInfo) {
  console.log(loginInfo);
  return await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    }
  })
}