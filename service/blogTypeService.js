/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 16:10:41
 * @LastEditors: your name
 * @Description: 
 */

const { validate } = require('validate.js')
const { addBlogTypeDao, findAllBlogTypeDao, findOneBlogTypeDao, updateBlogTypeDao, deleteBlogTypeDao } = require("../dao/blogTypeDao")
const { handleDataPattern, formatResponse } = require("../utils/tool")
const { ValidationError } = require("../utils/errors")

/**
 * 
 * @param {Object} newBlogTypeInfo 新增博客分类信息
 * @description 新增博客分类
 */
module.exports.addBlogTypeService = async function (newBlogTypeInfo) {
  // 数据验证规则
  const blogTypeRule = {
    name: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    },
    order: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    }
  }
  // 数据验证 undefied 验证通过
  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule)
  console.log('validateResult >>>', validateResult);
  if (!validateResult) {
    // 验证通过
    newBlogTypeInfo.articleCount = 0;
    const data = await addBlogTypeDao(newBlogTypeInfo)
    return formatResponse(0, "", data)
  } else {
    throw new ValidationError("数据验证失败");
  }
}

/**
 * 
 * @param {Object} newBlogTypeInfo 新增博客分类信息
 * @description 查询所有博客分类
 */
module.exports.findAllBlogTypeService = async function () {
  const data = await findAllBlogTypeDao()
  console.log('data', data);
  // 根据order进行排序
  const obj = formatResponse(0, "", handleDataPattern(data));
  obj.data.sort((a, b) => a.order - b.order)
  return obj
}

/**
 * 
 * @param {Number} id 博客id
 * @returns 
 * @description 获取其中一个博客分类
 */
module.exports.findOneBlogTypeService = async function (id) {
  const { dataValues } = await findOneBlogTypeDao(id)
  return formatResponse(0, "", dataValues)
}

/**
 * 
 * @param {Number} id 博客id
 * @param {Object} blogInfo 新的博客信息
 * @description 修改其中一个博客分类
 * @returns 
 */
module.exports.updateBlogTypeService = async function (id, blogInfo) {
  const data = await updateBlogTypeDao(id, blogInfo);
  return formatResponse(0, "", data)
}

/**
 * 
 * @param {Number} id 博客id
 * @description 删除其中一个博客分类
 * @returns 
 */
module.exports.deleteBlogTypeService = async function (id) {
  await deleteBlogTypeDao(id)
  // 这里需要返回受影响的文章的数量 .....
  return formatResponse(0, "", true)
}



