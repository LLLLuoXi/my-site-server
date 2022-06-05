/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-05 16:27:50
 * @LastEditors: your name
 * @Description: 
 */

var express = require('express');
var router = express.Router();
const { loginService } = require('../service/adminService')

router.post('/login', async function (req, res, next) {
  // console.log(req.body, '>>>');
  // 验证码验证

  // 登录
  const result = await loginService(req.body)
  console.log('result>>>', result);
});

module.exports = router;
