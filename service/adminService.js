/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-07 22:40:08
 * @LastEditors: your name
 * @Description: admin 业务逻辑层
 */

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { loginDao, updateAdminDao } = require('../dao/adminDao')
const { ValidationError } = require('../utils/errors')
const { formatResponse } = require('../utils/tool')

// 登录
module.exports.loginService = async function (loginInfo) {
  console.log('loginInfo', loginInfo);
  loginInfo.loginPwd = md5(loginInfo.loginPwd)
  // 数据验证
  let data = await loginDao(loginInfo)
  console.log('data', data);
  if (data && data.dataValues) {
    // 添加token
    data = {
      id: data.dataValues.id,
      loginId: data.dataValues.loginId,
      name: data.dataValues.name,
    };
    // 若用户勾选了登录7天，则loginInfo.remember = 7赋值给loginPriod，不然默认是1天
    let loginPriod = null;
    if (loginInfo.remember) {
      loginPriod = parseInt(loginInfo.remember)
    } else {
      loginPriod = 1
    }
    // 生产token
    const token = jwt.sign(data, md5(process.env.JWT_SECRET), { expiresIn: 24 * 60 * 60 * loginPriod })
    return {
      token,
      data
    }
  }

  return { data }
}

//更新
module.exports.updateAdminService = async function (accountInfo) {
  console.log('accountInfo', accountInfo);
  // 使用旧密码查询账号信息对应的用户
  const adminInfo = await loginDao({
    loginId: accountInfo.loginId,
    loginPwd: md5(accountInfo.oldLoginPwd)
  })
  console.log('adminInfo', adminInfo);
  // 旧密码正确,查到用户信息
  if (adminInfo && adminInfo.dataValues) {
    const newPwd = md5(accountInfo.loginPwd);
    await updateAdminDao({
      name: accountInfo.name,
      loginId: accountInfo.loginId,
      loginPwd: newPwd,
    })
    return formatResponse(0, "", {
      "loginId": accountInfo.loginId,
      "name": accountInfo.name,
      "id": adminInfo.dataValues.id
    })
    // console.log('result>>>', result);
  } else {
    // 密码不正确
    throw new ValidationError("旧密码不正确")
  }
}