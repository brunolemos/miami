'use strict'

var g           = require('co-express')
var request     = require('co-request')
var querystring = require('querystring')
/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/search/google').get(google)
}

var google = g(function* (req, res, next) {
  req.query.cx = req.query.cx || '008987570846403666039:ixysdvbhxts'
  req.query.searchType = req.query.searchType || 'image'
  req.query.fileType = req.query.fileType || 'jpg'
  req.query.imgSize = req.query.imgSize || 'large'
  req.query.imgType = req.query.imgType || 'photo'
  req.query.key = req.query.key || process.env.GOOGLE_API_KEY
  req.query.q = req.query.q || ''

  var q = querystring.stringify(req.query)
  var url = `https://www.googleapis.com/customsearch/v1?${q}`
  console.log(q)

  var googleRes = yield request(url)
  var images = []
  console.log(googleRes.body)

  if (!googleRes.error && googleRes.statusCode == 200) {
    var results = JSON.parse(googleRes.body).responseData.results

    for(let i = 0; i < limit && i < results.length; i++) {
      var image = {
        width  : results[i].width,
        height : results[i].height,
        url    : results[i].url
      }

      images.push(image)
    }
  }

  res.json(results)
})
