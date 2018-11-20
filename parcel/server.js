const Koa = require('koa')
const { resolve } = require('path')
const serve = require('koa-static')

const app = new Koa()

app.use(serve(resolve(__dirname, './dist')))

app.listen(4466)
