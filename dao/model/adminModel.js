/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-05 15:30:07
 * @LastEditors: your name
 * @Description: 
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("admin", {
  // 表里的字段
  loginId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})