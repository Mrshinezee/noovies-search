const axios = require('axios')
console.log(process.env.OMDB_KEY)

const getRequestPromise = (s, page) => axios.get('http://www.omdbapi.com/', {
  params: {
    s,
    apikey: process.env.OMDB_KEY,
    page,
  },
})

module.exports = async (keyword) => {
  try {
    const firstRequestPromise = getRequestPromise(keyword, 1)
    const secondRequestPromise = getRequestPromise(keyword, 2)

    const [
      firstResponse,
      secondResponse,
    ] = await Promise.all([firstRequestPromise, secondRequestPromise])

    let responseData = []

    if (firstResponse.data.Response === 'True') {
      responseData = responseData
        .concat(firstResponse.data.Search)
    }
    if (secondResponse.data.Response === 'True') {
      responseData = responseData
        .concat(secondResponse.data.Search)
    }

    return responseData
  } catch (error) {
    throw error
  }
}