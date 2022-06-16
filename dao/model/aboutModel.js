/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 21:41:46
 * @LastEditors: your name
 * @Description: 
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("about", {
  // 表里的字段
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})