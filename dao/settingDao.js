/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 23:18:12
 * @LastEditors: your name
 * @Description: 
 */

const settingModel = require('./model/settingModel')

// 查询全局配置
module.exports.findSettingDao = async function () {
  return await settingModel.findOne()
}

// 修改全局配置
module.exports.updateSettingDao = async function (newSettingInfo) {
  settingModel.update(newSettingInfo, {
    where: {
      id: 1
    }
  })
  return await settingModel.findOne()
}