/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-10 23:51:59
 * @LastEditors: your name
 * @Description:
 */

const jwt = require('jsonwebtoken')
const md5 = require('md5')
const multer = require('multer')
const path = require('path')

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


// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/static/uploads');
  },
  // 上传到服务器的文件，文件名要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(file.originalname, path.extname(file.originalname));
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName = basename + new Date().getTime() + Math.floor(Math.random() * 9000 + 1000) + extname;
    cb(null, newName);
  }
})

module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
    files: 1
  }
})
