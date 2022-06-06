/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-06 21:10:13
 * @LastEditors: your name
 * @Description: 
 */

var express = require('express');
var router = express.Router();
const { loginService } = require('../service/adminService')
const { formatResponse, analysisToken } = require('../utils/tool')

router.post('/login', async function (req, res, next) {
  // console.log(req.body, '>>>');
  // 验证码验证

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

module.exports = router;
