/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-08 21:19:47
 * @LastEditors: your name
 * @Description: 
 */

const svgCaptcha = require('svg-captcha')
module.exports.getCaptchaService = async function () {
  return svgCaptcha.create({
    size: 4,
    ignoreChars: "iIl10Oo",
    noise: 6,
    color: true,
  })
}