/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-11 21:26:02
 * @LastEditors: your name
 * @Description: 
 */

const blogTypeModel = require('./model/blogTypeModel')

// 添加博客分类
module.exports.addBlogTypeDao = async function (newBlogTypeInfo) {
  const { dataValues } = await blogTypeModel.create(newBlogTypeInfo)
  return dataValues
}

// 获取所有博客分类
module.exports.findAllBlogTypeDao = async function () {
  return await blogTypeModel.findAll()
}

// 获取其中一个博客分类
module.exports.findOneBlogTypeDao = async function (id) {
  const { dataValues } = await blogTypeModel.findByPk(id)
  return dataValues
}

// 修改其中一个博客分类
module.exports.updateBlogTypeDao = async function (id, BlogTypeInfo) {
  await blogTypeModel.update(BlogTypeInfo, {
    where: {
      id
    }
  })
  // 修改之后再查询新的信息
  const { dataValues } = await blogTypeModel.findByPk(id)
  return dataValues
}

// 删除其中一个博客分类
module.exports.deleteBlogTypeDao = async function (id) {
  return await blogTypeModel.destroy({
    where: {
      id
    }
  })
}