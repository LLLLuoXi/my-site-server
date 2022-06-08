/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-08 21:32:23
 * @LastEditors: your name
 * @Description: 
 */
const express = require('express');
const router = express.Router();
const { getCaptchaService } = require('../service/captchaService')


router.get('/', async function (req, res, next) {
  // 生成一个验证码 存在settion里
  const captcha = await getCaptchaService()
  req.session.captcha = captcha.text;
  res.setHeader("Content-Type", "image/svg+xml")
  res.send(captcha.data);
});

module.exports = router;
