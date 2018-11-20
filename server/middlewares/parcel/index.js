// 是否是开发环境

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

// 根据判断引入适当的文件
module.exports = require(`./${env}.js`)
