/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-07 22:20:43
 * @LastEditors: your name
 * @Description: 自定义错误，当错误发生的时候，捕获并抛出自定义错误信息
 */

const { formatResponse } = require('../utils/tool')

// 基类
class ServiceError extends Error {
  /**
   * 
   * @param {*} message 错误消息
   * @param {*} code 错误消息码
   */
  constructor(message, code) {
    super(message);
    this.code = code;
  }

  toResponseJson() {
    return formatResponse(this.code, this.message, null)
  }
}

// 文件上传错误
exports.UploadError = class extends ServiceError {
  constructor(message) {
    super(message, 413)
  }
}

// 禁止访问错误
exports.ForbiddenError = class extends ServiceError {
  constructor(message) {
    super(message, 401)
  }
}

// 验证错误
exports.ValidationError = class extends ServiceError {
  constructor(message) {
    super(message, 406)
  }
}

// 无资源错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super('not founded', 404)
  }
}

// 未知错误
exports.UnknownError = class extends ServiceError {
  constructor() {
    super('server internal error', 500)
  }
}

module.exports.ServiceError = ServiceError;