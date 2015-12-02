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
  * Expose models/medicine
  */
exports = module.exports = Medicine
