const rp = require('request-promise-native')

async function fetchMoive(movie) {
  const url = `http://api.douban.com/v2/movie/subject/${movie.doubanId}`
  const res = await rp(url)
  let body

  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }

  return body
}

; (async () => {
  const movies = [
    { doubanId: 1764796 }
  ]

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    const movieData = await fetchMoive(movie)
    console.log(movieData)
  }
})()