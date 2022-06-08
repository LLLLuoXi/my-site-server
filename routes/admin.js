/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-08 22:02:09
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { loginService, updateAdminService } = require('../service/adminService')
const { formatResponse, analysisToken } = require('../utils/tool')
const { ValidationError } = require('../utils/errors')

router.post('/login', async function (req, res, next) {
  console.log(req.body, '>>>');
  console.log(req.session, '>>>');
  // 验证码验证
  if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    // 输入验证码不正确
    throw new ValidationError("验证码错误")
  }

  // 登录
  const result = await loginService(req.body)
  if (result.token) {
    res.setHeader("authentication", result.token)
  }
  res.send(formatResponse(0, "", result.data));

  console.log('result>>>', result);
});

// 回复登录状态
router.get('/whoami', async function (req, res, next) {
  // 从客服端请求获取token,然后解析token 还原成有用的信息
  const token = analysisToken(req.get('Authorization'))
  console.log(token)
  // 返回给客户端
  res.send(formatResponse(0, "", {
    "loginId": token.loginId,
    "name": token.name,
    "id": token.id
  }))
})

// 修改
router.put('/', async function (req, res, next) {
  // console.log(req.body, '>>>');
  res.send(await updateAdminService(req.body))

})

module.exports = router;
