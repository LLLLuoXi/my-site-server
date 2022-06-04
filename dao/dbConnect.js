/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-04 14:27:52
 * @LastEditors: your name
 * @Description: 负责连接数据库
 */

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  // 控制台不显示sql语句
  logging: false,
});

// 测试连接
(async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}())
