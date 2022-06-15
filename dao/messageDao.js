/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-15 21:48:51
 * @LastEditors: your name
 * @Description: 
 */

const messageModel = require('./model/messageModel')
const blogModel = require('./model/blogModel')
const { Op } = require('sequelize')

// 新增评论或者留言
module.exports.addMessageDao = async function (newMessage) {
  const { dataValues } = await messageModel.create(newMessage)
  return dataValues
}

// 分页获取评论或者留言
module.exports.findMessageByPageDao = async function (pageInfo) {
  // 根据blogId区分评论和留言，有blogId说明是获取对应blogId文章的评论
  if (pageInfo.blogId) {
    // 获取所有的文章评论 或 只获取对应文章的评论
    if (pageInfo.blogId === 'all') {
      return await messageModel.findAndCountAll({
        offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
        limit: pageInfo.limit * 1,
        where: {
          blogId: {
            [Op.ne]: null
          }
        },
        include: [
          {
            model: blogModel,
            as: 'blog'
          }
        ],
        order: [["createDate", "DESC"]]
      })

    } else {
      return await messageModel.findAndCountAll({
        offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
        limit: pageInfo.limit * 1,
        where: {
          blogId: pageInfo.blogId * 1
        },
        order: [["createDate", "DESC"]]
      })
    }

  } else {
    // 获取留言
    return await messageModel.findAndCountAll({
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
      where: {
        blogId: null
      },
      order: [["createDate", "DESC"]]
    })
  }


}

// 删除留言或者评论
module.exports.deleteMessageDao = async function (id) {
  return await messageModel.destroy({
    where: {
      id
    }
  })
}