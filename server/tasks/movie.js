const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

;(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, [])
  let invoke = false

  child.on('error', err => {
    if (invoke) return
    invoke = true
    console.log(err)
  })

  child.on('exit', code => {
    if (invoke) return
    invoke = true
    let err = code === 0 ? null : new Error('exit code ' + code)

    console.log(err)
  })

  child.on('message', data => {
    let result = data.result
    console.log(result)
    result.forEach(async item => {
      let movie = await Movie.findOne({
        doubanId: item.doubanId
      })
      if (!movie) {
        movie = new Movie(item)
        await movie.save()
      }
    })
  })
})()
