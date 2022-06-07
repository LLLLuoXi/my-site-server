/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-07 22:04:43
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

// 更新管理员
module.exports.updateAdminDao = async function (newAccountInfo) {
  console.log('newAccountInfo', newAccountInfo);
  return await adminModel.update(newAccountInfo, {
    where: {
      loginId: newAccountInfo.loginId
    }
  })
}