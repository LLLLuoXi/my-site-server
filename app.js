/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-16 23:25:39
 * @LastEditors: your name
 * @Description: 
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt");
const md5 = require('md5');
const session = require('express-session');
const { ForbiddenError, UnknownError, ServiceError } = require('./utils/errors')



// 引入环境变量 默认读取根目录下的 .env
require('dotenv').config()
require('express-async-errors');
// 引入数据库连接
require('./dao/db')

// 引入路由
var adminRouter = require('./routes/admin');
var captchaRouter = require('./routes/captcha')
var bannerRouter = require('./routes/banner')
var uploadRouter = require('./routes/upload')
var blogTypeRouter = require('./routes/blogType')
var blogRouter = require('./routes/blog')
var demoRouter = require('./routes/demo')
var messageRouter = require('./routes/message')
var aboutRouter = require('./routes/about')
var settingRouter = require('./routes/setting')

var app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// 使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置验证token接口
app.use(jwt({
  secret: md5(process.env.JWT_SECRET),
  // 新版本的express-jwt 必须要求指定算法 https://www.npmjs.com/package/express-jwt
  algorithms: ['HS256'],
}).unless({
  // 需要排除token验证的路由
  path: [
    { "url": "/api/admin/login", methods: ["POST"] },
    { "url": "/res/captcha", methods: ["GET"] },
    { "url": "/api/banner", methods: ["GET"] },
    { "url": "/api/blogtype", methods: ["GET"] },
    { "url": "/api/blog", methods: ["GET"] },
    { "url": /\/api\/blog\/\d/, methods: ["GET"] },
    { "url": "/api/project", methods: ["GET"] },
    { "url": "/api/message", methods: ["GET", "POST"] },
    { "url": "/api/comment", methods: ["GET", "POST"] },
    { "url": "/api/about", methods: ["GET"] },
    { "url": "/api/setting", methods: ["GET"] },
  ]
}))


// 使用路由中间件
app.use('/api/admin', adminRouter);
app.use('/res/captcha', captchaRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/blogType', blogTypeRouter);
app.use('/api/blog', blogRouter);
app.use('/api/project', demoRouter);
app.use('/api/comment', messageRouter);
app.use('/api/message', messageRouter);
app.use('/api/about', aboutRouter);
app.use('/api/setting', settingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  console.log('-------', err)
  if (err.name === "UnauthorizedError") {
    res.send(new ForbiddenError("未登录，或者登录已过期").toResponseJson())
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJson())
  }
  else {
    res.send(new UnknownError().toResponseJson())
  }
});

module.exports = app;
