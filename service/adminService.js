/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-06 20:45:17
 * @LastEditors: your name
 * @Description: admin 业务逻辑层
 */

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const { loginDao } = require('../dao/adminDao')

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