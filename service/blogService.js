/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 16:13:01
 * @LastEditors: your name
 * @Description: 
 */

const { validate } = require('validate.js')
const blogTypeModel = require('../dao/model/blogTypeModel')
const { addBlogDao, findBlogByPageDao, findBlogByIdDao, updateBlogDao, deleteBlogDao } = require("../dao/blogDao");
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

/**
 * 
 * @param {Number} id 博文id
 * @param {STRING} auth token
 * @desciption 根据id获取一篇博文
 * @returns 
 */
module.exports.findBlogByIdService = async function (id, auth) {
  const data = await findBlogByIdDao(id)
  // 需要重新处理toc 还原成数组
  data.dataValues.toc = JSON.parse(data.dataValues.toc)
  // 根据auth是否有值决定浏览数是否自增
  if (!auth) {
    data.scanNumber++
    await data.save()
  }
  return formatResponse(0, "", data.dataValues)
}

/**
 * 
 * @param {*} id 博文id
 * @param {*} newBlogInfo 用于修改的新博文信息
 * @desciption 修改其中一个博客
 * @returns 
 */
module.exports.updateBlogService = async function (id, newBlogInfo) {
  // 判断正文内容有没有改变，因为正文内容的改变会影响toc
  if (newBlogInfo.htmlContent) {
    // 有改动, 需要重新处理toc目录
    newBlogInfo.toc = JSON.stringify('["a":"b]')
  }
  const { dataValues } = await updateBlogDao(id, newBlogInfo)
  return formatResponse(0, "", dataValues)
}

/**
 * 
 * @param {*} id 博文id
 * @desciption 删除其中一个博客
 * @returns 
 */
module.exports.deleteBlogService = async function (id) {
  // 根据id查询该文章的信息
  const data = await findBlogByIdDao(id)
  // 根据文章对应的分类，该分类的文章数量自减
  const categoryInfo = await findOneBlogTypeDao(data.dataValues.categoryId)
  categoryInfo.articleCount--
  await categoryInfo.save()
  // 对应的评论也要删除

  // 删除文章
  await deleteBlogDao(id)
  return formatResponse(0, "", true)
}