/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 21:42:01
 * @LastEditors: your name
 * @Description: 
 */

const { validate } = require('validate.js')
const { formatResponse, handleDataPattern } = require("../utils/tool")
const { ValidationError } = require("../utils/errors")
const { findAllDemoDao, addDemoDao, updateDemoDao, deleteDemoDao } = require('../dao/demoDao')

/**
 * @description 获取所有项目demo
 */
module.exports.findAllDemoService = async function () {
  const data = await findAllDemoDao()
  const obj = handleDataPattern(data)
  // 把项目描述description转换成数组
  obj.forEach(item => {
    item.description = JSON.parse(item.description)
  })
  return formatResponse(0, "", obj)
}


/**
 * 
 * @param {*} newDemoInfo 新增信息
 * @description 新增项目demo
 * @returns 
 */
module.exports.addDemoService = async function (newDemoInfo) {
  // const data = await addDemoDao()
  // 处理 项目描述 description转为字符串
  newDemoInfo.description = JSON.stringify(newDemoInfo.description)
  // 定义验证规则
  const demoRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string"
    },
    url: {
      presence: {
        allowEmpty: false,
      },
      type: "string"
    },
    github: {
      presence: {
        allowEmpty: false,
      },
      type: "string"
    },
    description: {
      presence: {
        allowEmpty: false,
      },
      type: "string"
    },
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "integer"
    },
    thumb: {
      type: "string"
    }
  }

  const validateResult = validate.validate(newDemoInfo, demoRule)
  // 验证成功
  if (!validateResult) {
    const data = await addDemoDao(newDemoInfo)
    console.log('data', data)
    return formatResponse(0, "", [data])
  } else {
    throw new ValidationError('数据验证失败')
  }
}

/**
 * 
 * @param {*} id 修改的项目id
 * @param {*} newDemoInfo 修改信息
 * @description 修改项目
 * @returns 
 */
module.exports.updateDemoService = async function (id, newDemoInfo) {
  if (newDemoInfo.description) {
    newDemoInfo.description = JSON.stringify(newDemoInfo.description)
  }
  const { dataValues } = await updateDemoDao(id, newDemoInfo)
  // 还原description
  dataValues.description = JSON.parse(dataValues.description)
  return formatResponse(0, "", [dataValues])
}


// 
/**
 * 
 * @param {*} id 删除的项目id 
 * @description 删除项目
 * @returns 
 */
module.exports.deleteDemoService = async function (id) {
  await deleteDemoDao(id)
  return formatResponse(0, "", true)
}