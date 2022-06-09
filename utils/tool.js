/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-09 21:35:38
 * @LastEditors: your name
 * @Description:
 */

const jwt = require('jsonwebtoken')
const md5 = require('md5')

/**
 * 
 * @param {*} code 
 * @param {*} msg 
 * @param {*} data 
 * @description:格式化响应数据
 */
module.exports.formatResponse = function (code, msg, data) {
  return {
    "code": code,
    "msg": msg,
    "data": data
  }
}

/**
 * 
 * @param {*} token 
 * @returns {String}
 * @description: jwt解析token
 */
module.exports.analysisToken = function (token) {
  return jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET))
}

/**
 * 
 * @param {Array} data 响应数据
 * @returns {Array}
 * @description: 处理数组类型的响应数据
 */
module.exports.handleDataPattern = function (data) {
  const arr = []
  for (const item of data) {
    arr.push(item.dataValues)
  }
  return arr;
}