'use strict'

var g = require('co-express')

/**
* Loads the models
*/
var User = require('../models/user')
var Medicine = require('../models/medicine')
var UserMedicine = User.Medicines

/**
 * Generates the routes
 * @param express.Router router
 */
module.exports = (router) => {
  router.route('/medicines')
    .get(list)
    .post(create)
}

var list = g(function* (req, res, next) {
  var medicines = yield Medicine.findAll({
    attributes : Medicine.attr,
  })

  res.spit(medicines)
})

var create = g(function* (req, res, next) {
  var medicine = yield Medicine.createFromObject(req.query)
  res.spit(medicine)
})
