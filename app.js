/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-07 22:20:47
 * @LastEditors: your name
 * @Description: 
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { expressjwt: jwt } = require("express-jwt");
var md5 = require('md5');
var { ForbiddenError, UnknownError, ServiceError } = require('./utils/errors')



// 引入环境变量 默认读取根目录下的 .env
require('dotenv').config()
require('express-async-errors');
// 引入数据库连接
require('./dao/db')

var adminRouter = require('./routes/admin');

var app = express();

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
    { "url": "/api/admin/login", methods: ["POST"] }
  ]
}))


// 使用路由中间件
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function (err, req, res, next) {
  console.log(err)
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
