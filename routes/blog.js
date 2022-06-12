/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-12 18:51:21
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const { addBlogService, findBlogByPageService } = require('../service/blogService')

// 添加博客
router.post('/', async function (req, res, next) {
  res.send(await addBlogService(req.body))
})

// 分类获取博客
router.get('/', async function (req, res, next) {
  res.send(await findBlogByPageService(req.query))
})

// 获取其中一个博客
router.get('/:id', async function (req, res, next) {

})

// 修改其中一个博客
router.put('/:id', async function (req, res, next) {

})

// 删除其中一个博客
router.delete('/:id', async function (req, res, next) {

})

module.exports = router;