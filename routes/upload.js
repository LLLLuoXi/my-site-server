/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-10 23:53:42
 * @LastEditors: your name
 * @Description: 
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploading } = require('../utils/tool')
const { UploadError } = require('../utils/errors')

// 上传图片
router.post("/", async function (req, res, next) {
  // single 方法里面书写上传控件的 name 值
  uploading.single("file")(req, res, function (err) {
    console.log('req.file', req.file);
    if (err instanceof multer.MulterError) {
      next(new UploadError("上传文件失败，请检查文件的大小，控制在 2MB 以内"));
    } else {
      const path = "/static/uploads/" + req.file.filename;
      res.send(formatResponse(0, "", path));
    }
  })
});

module.exports = router;