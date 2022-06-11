/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-11 14:39:21
 * @LastEditors: your name
 * @Description: blogType 模型
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("blogType", {
  // 表里的字段
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  articleCount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})