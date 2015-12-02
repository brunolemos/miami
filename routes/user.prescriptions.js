'use strict'

var g = require('co-express')

/**
* Loads the models
*/
var User = require('../models/user')
var Medicine = require('../models/medicine')
var UserPrescription = User.Prescriptions

/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/user/prescriptions')
    .get(User.authenticator, list)
    .post(User.authenticator, create)
}

var list = g(function* (req, res, next) {
  var medicines = yield UserPrescription.findAll({
    attributes : UserPrescription.attr,
    include : [ User ],
    where      : {
      userId    : req.user.id
    }
  })

  res.spit(medicines.dataValues)
})

var list = g(function* (req, res, next) {
  var medicines = yield UserPrescription.findAll({
    attributes  : UserPrescription.attr,
    include : [ User, Medicine ],
    where       : {
      userId    : req.user.id
    }
  })

  res.spit(medicines)
})

var create = g(function* (req, res, next) {
  req.query.userId = req.user.id

  var userMedicine = yield UserPrescription.createFromObject(req.query)
  res.spit(userMedicine)
})
