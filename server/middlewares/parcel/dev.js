/**
 * 开发环境的配置  提供动态编译的能力
 */
const Bundler = require('parcel-bundler')
// 静态网页访问
const views = require('koa-views')

const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

// 编译之后的路径   监听文件
const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/',
  watch: true
})

export const dev = async app => {
  await bundler.bundle()

  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })
  // 渲染的主页内容  开发环境下 koa访问页面
  app.use(async ctx => {
    await ctx.render('index.html')
  })
}
