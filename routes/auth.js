'use strict'

var g = require('co-express')

/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/auth/facebook').get(facebook)
}

var facebook = g(function* (req, res, next) {
  res.send('facebook')
})
