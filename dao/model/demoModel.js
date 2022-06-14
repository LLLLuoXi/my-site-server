/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 20:34:11
 * @LastEditors: your name
 * @Description: 项目管理  model
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("demo", {
  // 表里的字段
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  github: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumb: {
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