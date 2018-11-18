const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const mongoose = require('mongoose')

;(async () => {
  await connect()

  initSchemas()

  const app = new Koa()

  require('./tasks/movie')

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
