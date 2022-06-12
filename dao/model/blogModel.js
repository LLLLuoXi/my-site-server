/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-12 18:18:39
 * @LastEditors: your name
 * @Description: 
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect')

module.exports = sequelize.define("blog", {
  // 表里的字段
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  htmlContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scanNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  commentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
})