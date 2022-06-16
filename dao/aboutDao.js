/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 22:10:37
 * @LastEditors: your name
 * @Description:
 */
const aboutModel = require('./model/aboutModel')

/**
 * 
 * @description 查询about页面url
 * @returns 
 */
module.exports.findAboutDao = async function () {
  return await aboutModel.findOne()
}

/**
 * 
 * @param {*} newUrl 
 * @description 修改about页面url
 * @returns 
 */
module.exports.updateAboutDao = async function (newUrl) {
  const data = await aboutModel.findOne();
  data.url = newUrl;
  await data.save();
  return data.dataValues;
}