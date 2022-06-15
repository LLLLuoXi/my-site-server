/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-15 21:58:43
 * @LastEditors: your name
 * @Description: 
 */

const fs = require('fs')
const { validate } = require('validate.js')
const { addMessageDao, findMessageByPageDao, deleteMessageDao } = require('../dao/messageDao')
const { findBlogByIdDao } = require('../dao/blogDao')
const { ValidationError, UnknownError } = require("../utils/errors")
const { formatResponse, handleDataPattern } = require("../utils/tool")
const dir = './public/static/avatar'

/**
 * 
 * @param {*} dir 目录地址
 * @returns {promise}
 */
async function readDirLength(dir) {
  return new Promise(resolve => {
    fs.readdir(dir, (err, files) => {
      if (err) throw new UnknownError()
      resolve(files)
    })
  })
}

/**
 * 
 * @param {*} newMessage 评论或留言信息
 * @decription 新增评论或者留言
 * @returns 
 */
module.exports.addMessageService = async function (newMessage) {
  // 数据验证规则
  const messageRule = {
    nickname: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    },
    content: {
      presence: {
        allowEmpty: false
      },
      type: "string"
    },
    // 可选 留言没有bolgId
    blogId: {
      type: "string"
    }
  }

  const validateResult = validate.validate(newMessage, messageRule)
  if (!validateResult) {
    // 
    newMessage.blogId = newMessage.blogId ? newMessage.blogId : null
    newMessage.createDate = Date.now()
    // 头像地址随机生成 头像在static下的avatar目录
    const files = await readDirLength(dir)
    // 随机取一张头像
    const randomIndex = Math.floor(Math.random() * files.length)
    newMessage.avatar = '/static/avatar/' + files[randomIndex]
    // 新增
    const data = await addMessageDao(newMessage)
    // 如果是文章评论，对应文章的评论数量需要自增
    if (newMessage.blogId) {
      const blogData = await findBlogByIdDao(newMessage.blogId)
      blogData.commentNumber++
      await blogData.save()
    }
    return formatResponse(0, "", data)
  } else {
    throw new ValidationError("数据验证失败")
  }
}

/**
 * 
 * @param {*} pageInfo 分页信息
 * @decription 分页获取评论或者留言
 * @returns 
 */
module.exports.findMessageByPageService = async function (pageInfo) {
  const data = await findMessageByPageDao(pageInfo)
  const rows = handleDataPattern(data.rows)
  return formatResponse(0, "", {
    "total": data.count,
    "rows": rows
  })
}

/**
 * 
 * @param {*} id 评论或留言id
 * @decription 删除留言或者评论
 * @returns 
 */
module.exports.deleteMessageService = async function (id) {
  await deleteMessageDao(id)
  return formatResponse(0, "", true)
}