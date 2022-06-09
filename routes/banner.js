/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-09 21:51:10
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { findBannerService, updateBannerService } = require('../service/bannerService')

// 获取首页标语
router.get('/', async function (req, res, next) {
  res.send(await findBannerService())
})

// 设置首页标语
router.post('/', async function (req, res, next) {
  res.send(await updateBannerService(req.body))
})

module.exports = router;