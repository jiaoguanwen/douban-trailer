const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const mongoose = require('mongoose')

;(async () => {
  await connect()

  initSchemas()

  const app = new Koa()

  // 拉取电影列表数据
  // require('./tasks/movie')
  // TODO 为什么一次只能跑一个task？
  // 拉取电影详细数据
  // require('./tasks/api')

  // Add render function to the ctx and some options
  app.use(
    views(resolve(__dirname, './views'), {
      extension: 'pug'
    })
  )

  app.use(async (ctx, next) => {
    await ctx.render('index', {
      you: 'Luke',
      me: 'Jiaoguanwen'
    })
  })

  app.listen(2333)
})()
