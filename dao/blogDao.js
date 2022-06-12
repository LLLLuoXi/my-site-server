/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-12 18:48:58
 * @LastEditors: your name
 * @Description: 
 */

const blogModel = require('./model/blogModel')
const blogTypeModel = require('./model/blogTypeModel')

// 添加博客
module.exports.addBlogDao = async function (newBlogInfo) {
  const { dataValues } = await blogModel.create(newBlogInfo);
  return dataValues;
}

//根据分页信息查询博客
module.exports.findBlogByPageDao = async function (pageInfo) {
  // pageInfo { page: '1', limit: '5', categoryid: '2' }
  if (pageInfo.categoryid && pageInfo.categoryid !== '-1') {
    // 根据分类信息来进行分页查询
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryid,
          }
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1
    })
  } else {
    // 根据所有文章分页来查询
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category"
        }
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1
    })
  }
}