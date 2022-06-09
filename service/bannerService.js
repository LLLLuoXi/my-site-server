/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-09 21:49:33
 * @LastEditors: your name
 * @Description: 
 */

const { findBannerDao, updateBannerDao } = require("../dao/bannerDao")
const { handleDataPattern, formatResponse } = require("../utils/tool")

module.exports.findBannerService = async function () {
  const data = handleDataPattern(await findBannerDao())
  return formatResponse(0, "", data)
}

module.exports.updateBannerService = async function (bannerArr) {
  const data = handleDataPattern(await updateBannerDao(bannerArr))
  return formatResponse(0, "", data)
}