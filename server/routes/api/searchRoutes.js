const express = require('express')
const flatCache = require('flat-cache')
const moment = require('moment')
const getMoviesData = require('../../helpers/getMoviesData')

const router = express.Router()

router.get('/', async (req, res) => {
  const cache = flatCache.load('moviesCache')
  const {
    keyword
  } = req.query
  const key = `${keyword}`
  console.log('keyzzzzz', key)

  try {
    const cacheContent = cache.getKey(key)
    const utcTime = moment.utc(new Date()).format()

    if (cacheContent) {
      res.send(cacheContent.data)

      const cacheTime = cacheContent.time
      const diff = moment(utcTime).diff(cacheTime, 'minutes')

      if (diff > 1) {
        const data = await getMoviesData(keyword)

        cache.setKey(key, {
          data,
          time: utcTime,
        })
        cache.save(true)
      }
    } else {
      const data = await getMoviesData(keyword)

      res.send(data)

      cache.setKey(key, {
        data,
        time: utcTime,
      })
      cache.save(true)
    }
  } catch (error) {
    const { data, status } = error.response || {}
    res.status(400).send(data)
  }
})

module.exports = router
