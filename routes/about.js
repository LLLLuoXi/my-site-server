/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 21:56:15
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { findAboutService, updateAboutService } = require('../service/aboutService')

// 获取关于页面的url
router.get('/', async function (req, res, next) {
  res.send(await findAboutService());
})

// 设置关于页面的url
router.post('/', async function (req, res, next) {
  res.send(await updateAboutService(req.body.url));
})

module.exports = router;