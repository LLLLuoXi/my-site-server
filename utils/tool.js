/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-14 17:49:48
 * @LastEditors: your name
 * @Description:
 */

const jwt = require('jsonwebtoken')
const md5 = require('md5')
const multer = require('multer')
const path = require('path')
const toc = require('markdown-toc');

/**
 * 
 * @param {*} code 
 * @param {*} msg 
 * @param {*} data 
 * @description:格式化响应数据
 */
module.exports.formatResponse = function (code, msg, data) {
  return {
    "code": code,
    "msg": msg,
    "data": data
  }
}

/**
 * 
 * @param {*} token 
 * @returns {String}
 * @description: jwt解析token
 */
module.exports.analysisToken = function (token) {
  return jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET))
}

/**
 * 
 * @param {Array} data 响应数据
 * @returns {Array}
 * @description: 处理数组类型的响应数据
 */
module.exports.handleDataPattern = function (data) {
  const arr = []
  for (const item of data) {
    arr.push(item.dataValues)
  }
  return arr;
}


// 设置上传文件的引擎
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/static/uploads');
  },
  // 上传到服务器的文件，文件名要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(file.originalname, path.extname(file.originalname));
    // 获取后缀名
    const extname = path.extname(file.originalname);
    // 构建新的名字
    const newName = basename + new Date().getTime() + Math.floor(Math.random() * 9000 + 1000) + extname;
    cb(null, newName);
  }
})

module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
    files: 1
  }
})


// 处理toc
module.exports.handleTOC = function (info) {
  let result = toc(info.markdownContent).json
  console.log('result', result)
  // 经过toc方法，将所有的标题提取，形成一个数组
  // result [ { content: 'vue响应式原理', slug: 'vue响应式原理', lvl: 1, i: 0, seen: 0 } ]

  function transfer(flatArr) {
    const stack = []
    const result = []

    // 创建toc对象
    function createTOCItem(item) {
      return {
        name: item.content,
        anchor: item.slug,
        level: item.lvl,
        children: []
      }
    }

    function handleItem(item) {
      //如果数组为空，得到一个undefined
      const top = stack[stack.length - 1]
      if (!top) {
        stack.push(item)
      } else if (item.level > top.level) {
        // 当前toc对象的等级比栈顶（之前的上一个）要大
        // 说明当前toc对象应该成为上一个toc对象的子元素
        top.children.push(item)
        stack.push(item)
      } else {
        stack.pop()
        handleItem(item)
      }
    }

    // 标题最小级别
    let min = 6;
    // 寻找当前数组中最小的标题等级
    for (const i of flatArr) {
      if (i.lvl < min) {
        min = i.lvl
      }
    }

    for (const item of flatArr) {
      const tocItem = createTOCItem(item)
      if (tocItem.level === min) {
        //当前toc对象已经是最低等级，不会作为其他对象的children
        result.push(tocItem)
      } else {
        // 当前toc对象不是最低等级，可能是其他对象children数组里的一项
        handleItem(tocItem)
      }

    }
    return result
  }
  // 转换后的toc
  info.toc = transfer(result)
  delete info.markdownContent
  //为各个级别的标题加id
  for (const i of result) {
    switch (i.lvl) {
      case 1: {
        var newStr = `<h1 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h1>', newStr);
        break;
      }
      case 2: {
        var newStr = `<h2 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h2>', newStr);
        break;
      }
      case 3: {
        var newStr = `<h3 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h3>', newStr);
        break;
      }
      case 4: {
        var newStr = `<h4 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h4>', newStr);
        break;
      }
      case 5: {
        var newStr = `<h5 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h5>', newStr);
        break;
      }
      case 6: {
        var newStr = `<h6 id="${i.slug}">`;
        info.htmlContent = info.htmlContent.replace('<h6>', newStr);
        break;
      }
    }
  }
  console.log('info.toc', info.toc);
  return info;
}