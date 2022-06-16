/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 21:56:46
 * @LastEditors: your name
 * @Description:
 */

const { findAboutDao, updateAboutDao } = require('../dao/aboutDao')
const { formatResponse } = require("../utils/tool")

// 获取关于页面的url
module.exports.findAboutService = async function () {
  const { url } = await findAboutDao()
  return formatResponse(0, "", url)
}

// 设置关于页面的url
module.exports.updateAboutService = async function (newUrl) {
  const { url } = await updateAboutDao(newUrl);
  return formatResponse(0, "", url);
}