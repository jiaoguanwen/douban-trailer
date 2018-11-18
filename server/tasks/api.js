const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMoive(movie) {
  const url = `http://api.douban.com/v2/movie/${movie.doubanId}`
  const res = await rp(url)
  let body

  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }

  return body
}

;(async () => {
  let movies = await Movie.find({
    $or: [{ title: '' }, { year: { $exists: false } }, { summary: { $exists: false } }, { summary: null }, { summary: '' }]
  })

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    const movieData = await fetchMoive(movie)
    console.log(movieData)
  }
})()
