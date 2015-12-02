'use strict'

/**
 * Loads the libraries
 */
var g = require('co-express')
  , moment = require('moment')
  , crypto = require('crypto')
  , fbAuth = require('../misc/facebook-auth')
  , request = require('co-request')

/**
 * Loads the models
 */
var User = require('../models/user')

/**
 * Generates the user route
 * @param express.Router router
 */
exports = module.exports = (router) => {
  router.route('/user')
    .get(User.authenticator, me)
    .post(User.authenticator, update)
    .put(User.authenticator, update)
}

/**
 * Returns the current user
 */
var me = g(function* (req, res, next) {
  res.spit(req.user)
})

/**
 * Update the current user
 */
var update = g(function* (req, res, next) {
  delete req.body.access_token

  var user = yield User.update(req.body, {
    where: { id : req.body.userId }
  })

  res.spit(user)
})
