const { controller, get } = require('../lib/decorator')

@controller('/api/v0/books')
export class bookController {
  // 虽然达到了效果，但是总感觉这样写不太对
  // 目前是这样，因为前面装饰器装饰一个方法，所有路由那里取处理方法的时候，只能取到被修饰的方法
  @get('/')
  async getBooks(ctx, next) {
    const { type, year } = ctx.query
    console.log(type)
    console.log(year)
    console.log(ctx.query)

    next()
    console.log('control back to getbooks')
    ctx.body = {
      success: true,
      data: { t: 123 }
    }
  }

  @get('/')
  async test(ctx, next) {
    console.log('test control')
    console.log(ctx)
    next()
  }
}
