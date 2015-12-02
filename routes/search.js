'use strict'

var g = require('co-express')

/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/search/google').get(google)
}

var google = g(function* (req, res, next) {
  res.send('google')
})
