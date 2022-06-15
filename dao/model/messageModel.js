/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-15 20:18:22
 * @LastEditors: your name
 * @Description: 
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("message", {
  // 表里的字段
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})