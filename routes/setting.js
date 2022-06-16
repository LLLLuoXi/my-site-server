/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 23:26:03
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { findSettingService, updateSettingService } = require('../service/settingService')

// 查询全局配置
router.get('/', async function (req, res, next) {
  res.send(await findSettingService());
})

// 修改全局配置
router.put('/', async function (req, res, next) {
  res.send(await updateSettingService(req.body));
})

module.exports = router;