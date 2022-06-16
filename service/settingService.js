/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 23:27:45
 * @LastEditors: your name
 * @Description:
 */

const { findSettingDao, updateSettingDao } = require('../dao/settingDao')
const { formatResponse } = require("../utils/tool")

/**
 * 
 * @description 查询全局配置
 * @returns 
 */
module.exports.findSettingService = async function () {
  const { dataValues } = await findSettingDao()
  return formatResponse(0, "", dataValues)
}

/**
 * 
 * @param {Object} newSettingInfo 配置信息对象
 * @description 修改全局配置
 * @returns 
 */
module.exports.updateSettingService = async function (newSettingInfo) {
  const { dataValues } = await updateSettingDao(newSettingInfo)
  return dataValues
}