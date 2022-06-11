/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-11 21:48:53
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { addBlogTypeService, findAllBlogTypeService, findOneBlogTypeService, updateBlogTypeService, deleteBlogTypeService } = require('../service/blogTypeService')


// 添加博客分类
router.post('/', async function (req, res, next) {
  res.send(await addBlogTypeService(req.body))
})

// 获取博客分类
router.get('/', async function (req, res, next) {
  res.send(await findAllBlogTypeService())
})

// 获取其中一个分类
router.get('/:id', async function (req, res, next) {
  res.send(await findOneBlogTypeService(req.params.id))
})

// 修改其中一个博客分类
router.put('/:id', async function (req, res, next) {
  res.send(await updateBlogTypeService(req.params.id, req.body))
})

// 删除其中一个博客分类
router.delete('/:id', async function (req, res, next) {
  res.send(await deleteBlogTypeService(req.params.id))
})

module.exports = router;