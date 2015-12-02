'use strict'

var g = require('co-express')
  , Sequelize = require('sequelize')
  , sequelize = require('../config/database')().sequelize

/**
  * The medicine model
  */
var Medicine = sequelize.define('medicine', {
  id : {
    type          : Sequelize.INTEGER,
    primaryKey    : true,
    autoIncrement : true
  },
  name       : { type : Sequelize.STRING },
  picture    : { type : Sequelize.STRING }
})

/**
  * The medicine attributes
  */
Medicine.attr = {
  /* all */
}

/**
 * Creates a medicine from an object
 */
Medicine.createFromObject = g(function*(medicine) {
  // Checks if medicine exists on database
  var _medicine = yield Medicine.findOne({
    attributes : Medicine.attr,
    where      : {
      name     : medicine.name
    }
  })

  if (_medicine) return _medicine.dataValues

  return (yield Medicine.create(medicine)).dataValues;
})

/**
  * Expose models/medicine
  */
exports = module.exports = Medicine
