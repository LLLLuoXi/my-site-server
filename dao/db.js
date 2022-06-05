/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-05 15:45:43
 * @LastEditors: your name
 * @Description: 初始化数据库
 */

const sequelize = require('./dbConnect')
const md5 = require('md5')
const adminModel = require('./model/adminModel')

console.log(sequelize.sync);
(async function () {
  // 同步数据模型和表
  await sequelize.sync({
    alter: true,
  })
  // 同步之后，一下表需要一些初始化数据
  // 需要查询这张表有没有内容，没有内容才初始化数据
  const adminCount = await adminModel.count()
  if (!adminCount) {
    // 初始化数据
    await adminModel.create({
      loginId: 'admin',
      name: '超级管理员',
      loginPwd: md5("123456")
    })
    console.log('初始化管理员数据完毕...');
  }
  console.log('数据库数据已经准备完毕');
})()