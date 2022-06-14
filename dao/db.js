/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 20:35:19
 * @LastEditors: your name
 * @Description: 初始化数据库
 */

const sequelize = require('./dbConnect')
const md5 = require('md5')
const adminModel = require('./model/adminModel')
const bannerModel = require('./model/bannerModel')
const blogTypeModel = require('./model/blogTypeModel')
const blogModel = require('./model/blogModel')
const demoModel = require('./model/demoModel')

console.log(sequelize.sync);
(async function () {
  // 定义模型之间的关联关系

  // 博客和博客分类之间的关联
  blogTypeModel.hasMany(blogModel, { foreignKey: 'categoryId', targetKey: "id" });
  blogModel.belongsTo(blogTypeModel, { foreignKey: 'categoryId', targetKey: "id", as: "category" });

  // 同步数据模型和表
  await sequelize.sync({
    alter: true,
  })
  // 同步之后，一下表需要一些初始化数据
  // 需要查询这张表有没有内容，没有内容才初始化数据
  const adminCount = await adminModel.count()
  console.log('adminCount', adminCount);
  if (!adminCount) {
    // 初始化数据
    await adminModel.create({
      loginId: 'admin',
      name: '超级管理员',
      loginPwd: md5("123456")
    })
    console.log('初始化管理员数据完毕...');
  }

  // banner初始化
  const bannerCount = await bannerModel.count()
  console.log('bannerCount', bannerCount);
  if (!bannerCount) {
    await bannerModel.bulkCreate([{
      "midImg": "/static/images/bg1_mid.jpg",
      "bigImg": "/static/images/bg1_big.jpg",
      "title": "塞尔达旷野之息",
      "description": "2017年年度游戏，期待续作"
    }, {
      "midImg": "/static/images/bg2_mid.jpg",
      "bigImg": "/static/images/bg2_big.jpg",
      "title": "塞尔达四英杰",
      "description": "四英杰里面你最喜欢的又是谁呢"
    }, {
      "midImg": "/static/images/bg3_mid.jpg",
      "bigImg": "/static/images/bg3_big.jpeg",
      "title": "日本街道",
      "description": "动漫中经常出现的日本农村街道，一份独特的恬静"
    }]);
    console.log("初始化首页标语数据...");
  }

  console.log('数据库数据已经准备完毕');
})()
