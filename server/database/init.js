const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
// const glob = require('glob')
const { resolve } = require('path')
mongoose.Promise = global.Promise

exports.connect = () => {
  //连接数
  let maxConnectTimes = 0
  //确保连接数据库后 执行后面代码
  return new Promise(resolve => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      // 重连数据库
      maxConnectTimes++
      console.log('====================================')
      console.log('disconnected', maxConnectTimes)
      console.log('====================================')
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes++
      console.log('====================================')
      console.log('error', maxConnectTimes)
      console.log('====================================')
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    })

    mongoose.connection.once('open', () => {
      //写入数据
      resolve()
      console.log('MongoDB Connected successfully!')
      const Dog = mongoose.model('Dog', { name: String })
      const doga = new Dog({ name: '阿尔法' + Math.random() })

      doga.save().then(() => {
        console.log('wang')
      })
    })
  })
}
