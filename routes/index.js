'use strict'

var g = require('co-express')

/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/').get(index)
}

var index = g(function* (req, res, next) {
  res.send('hello')
})
