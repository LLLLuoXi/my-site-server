/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-12 18:53:32
 * @LastEditors: your name
 * @Description: 
 */

const { validate } = require('validate.js')
const blogTypeModel = require('../dao/model/blogTypeModel')
const { addBlogDao, findBlogByPageDao } = require("../dao/blogDao");
const { ValidationError } = require("../utils/errors")
const { handleDataPattern, formatResponse } = require("../utils/tool")
const { addBlogToType } = require("../dao/blogTypeDao")

// 扩展验证规则
validate.validators.categoryIdIsExist = async function (value) {
  const blogTypeInfo = blogTypeModel.findByPk(value);
  if (blogTypeInfo) {
    return;
  }
  return "CategoryId Is Not Exist";
}

/**
 * 
 * @param {Object} newBlogInfo 新增博客信息
 * @desciption 添加博客
 */
module.exports.addBlogService = async function (newBlogInfo) {
  // 处理TOC 
  // 将处理好的toc格式转为字符串
  newBlogInfo.toc = JSON.stringify('["a":"b]')

  // 初始化新文章的其他信息
  // 阅读量
  newBlogInfo.scanNumber = 0;
  // 评论数
  newBlogInfo.commentNumber = 0;

  // 定义验证规则
  const blogRule = {
    title: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    },
    description: {
      presence: {
        allowEmpty: true
      },
      type: "string"
    },
    toc: {
      presence: {
        allowEmpty: true
      },
      type: "string"
    },
    htmlContent: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    },
    thumb: {
      presence: {
        allowEmpty: true
      },
      type: "string"
    },
    scanNumber: {
      presence: {
        allowEmpty: false
      },
      type: "integer"
    },
    commentNumber: {
      presence: {
        allowEmpty: false
      },
      type: "integer"
    },
    createDate: {
      presence: {
        allowEmpty: false
      },
      type: "integer"
    },
    // 验证分类是否存在
    categoryId: {
      presence: true,
      type: "integer",
      categoryIdIsExist: true
    }
  }

  // 对传递过来的数据进行验证
  try {
    // 因为扩展验证规则里涉及异步操作，这里采用异步验证方式
    const result = await validate.async(newBlogInfo, blogRule)
    console.log('result', result);
    const data = await addBlogDao(newBlogInfo)
    // 新增文章之后，对应文章的分类也要新增
    await addBlogToType(newBlogInfo.categoryId)
    return formatResponse(0, "", data)
  } catch (e) {
    console.log(e);
    throw new ValidationError("数据验证失败")
  }

}

/**
 * 
 * @param {*Object} pageInfo 分页信息
 * @description 根据分类查询博客
 * @returns 
 */
module.exports.findBlogByPageService = async function (pageInfo) {
  console.log(pageInfo)
  const data = await findBlogByPageDao(pageInfo)
  // console.log(data);
  const rows = handleDataPattern(data.rows)
  // toc还原成数组
  rows.forEach(item => {
    item.toc = JSON.parse(item.toc)
  })
  return formatResponse(0, "", {
    "total": data.count,
    "rows": rows
  })
}