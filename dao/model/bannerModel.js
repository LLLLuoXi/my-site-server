/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-09 21:54:54
 * @LastEditors: your name
 * @Description: banner 首页标题数据模型
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("banner", {
  // 表里的字段
  midImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bigImg: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})