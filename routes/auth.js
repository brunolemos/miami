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
  router.route('/auth/facebook').get(facebookAuth)
}

/**
 * Returns the current user
 */
var me = g(function* (req, res, next) {
  res.spit(req.user)
})

/**
 * Authenticates an user from its FB token
 * @query fb_token The facebook token
 */
var facebookAuth = g(function* (req, res, next) {
  let fbToken = req.query.fb_token

  // Gets the user from facebook
  var fbUser = yield fbAuth(fbToken)

  if (fbUser.error) {
    res.err(res.errors.FB_TOKEN_DENIED, 401)
  } else {

    // Finds the user on database
    var user = yield User.findOne({
      attributes : User.attr,
      where : {
        facebookId : fbUser.id
      }
    })

    if (user == null) {

      // Creates user if not exists
      user = (yield User.create({
        name       : fbUser.name,
        email      : fbUser.email,
        facebookId : fbUser.id,
        picture    : fbUser.picture.data.url
      })).dataValues

    } else {

      user.name = fbUser.name
      user.email = fbUser.email
      user.picture = fbUser.picture.data.url

      yield user.save()

      // Destroy users old tokens
      // TODO: use in future
      // yield User.Token.destroy({
      //     where : { userId : user.id }
      // })

    }

    let accessToken = crypto.createHash('sha512')
    accessToken.update(fbToken)
    accessToken.update(moment().format())

    // Creates a token for session
    var userToken = (yield User.Token.create({
      userId      : user.id,
      accessToken : accessToken.digest('base64'),
      expireAt    : moment().add(10, 'years').format()
    }, {
      include : [ User ]
    })).dataValues

    res.spit(userToken)
  }
})
