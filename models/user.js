'use strict'

var g = require('co-express')
  , moment = require('moment')
  , Sequelize = require('sequelize')
  , sequelize = require('../config/database')().sequelize

var Medicine = require('./medicine')

/**
 * @apiDefine authentication Access rights needed.
 * A query parameter <code>access_token</code> is required.
 *
 * @apiVersion 1.0.0
 */

/**
 * The user model
 */
var User = sequelize.define('user', {
  id : {
    type          : Sequelize.INTEGER,
    primaryKey    : true,
    autoIncrement : true
  },
  creditCardToken : { type : Sequelize.STRING },
  name       : { type : Sequelize.STRING },
  email      : { type : Sequelize.STRING },
  facebookId : { type : Sequelize.STRING },
  picture    : { type : Sequelize.STRING }
})

/**
 * The user token model
 */
var UserToken = sequelize.define('userToken', {
  userId      : { type : Sequelize.INTEGER },
  accessToken : { type : Sequelize.STRING  },
  expireAt    : { type : Sequelize.DATE    }
})

/**
 * The user medicine model
 */
var UserMedicine = sequelize.define('userMedicine', {
  userId      : { type : Sequelize.INTEGER },
  medicineId  : { type : Sequelize.INTEGER  },
  count       : { type : Sequelize.INTEGER  }
})

/**
 * The user prescription model
 */
var UserPrescription = sequelize.define('userPrescription', {
  userId          : { type : Sequelize.INTEGER },
  userMedicineId  : { type : Sequelize.INTEGER },
  weekDay         : { type : Sequelize.INTEGER  },
  dayTime         : { type : Sequelize.INTEGER  },
  count           : { type : Sequelize.INTEGER  }
})

/**
 * Creates the relationship
 */
User.hasMany(UserToken)
User.hasMany(UserMedicine)
User.hasMany(UserPrescription)
UserMedicine.hasMany(UserPrescription)

/**
 * Creates the relationship
 */
UserToken.belongsTo(User)
UserMedicine.belongsTo(User)
UserMedicine.belongsTo(Medicine)
UserPrescription.belongsTo(User)
UserPrescription.belongsTo(UserMedicine)

/**
 * Attributes
 */
User.attr = {}/* all */
UserToken.attr = {}
UserMedicine.attr = {}
UserPrescription.attr = {}

// Associates UserToken with User
User.Token = UserToken
User.Medicines = UserMedicine
User.Prescriptions = UserPrescription

/**
 * Associates an authenticator
 */
User.authenticator = g(function* (req, res, next) {
  var accessToken = req.query.access_token ? req.query.access_token.replace(/ /g, '+') : null

  var userToken = yield User.Token.findOne({
    attributes : User.Token.attr,
    include    : [ User ],
    where : {
      accessToken : accessToken
    }
  })

  if (userToken == null || moment().isAfter(userToken.expireAt)) {
    res.err(res.errors.ACCESS_DENIED, 401)
  } else {
    req.user = userToken.user

    next()
  }

})

/**
 * Creates a user medicine from an object
 */
UserMedicine.createFromObject = g(function*(userMedicine) {
  if(!userMedicine.medicineId && userMedicine.name) {
    var medicine = yield Medicine.createFromObject(userMedicine)
    userMedicine.medicineId = medicine.id
  }

  // Checks if medicine exists on database
  var _userMedicine = yield UserMedicine.findOne({
    attributes : UserMedicine.attr,
    where      : {
      id       : userMedicine.id
    }
  })

  if (_userMedicine) return _userMedicine.dataValues

  return (yield UserMedicine.create(userMedicine)).dataValues;
})

/**
 * Creates a user medicine from an object
 */
UserPrescription.createFromObject = g(function*(userPrescription) {
  // Checks if medicine exists on database
  var _userPrescription = yield UserPrescription.findOne({
    attributes : UserPrescription.attr,
    where      : {
      userMedicineId : userPrescription.userMedicineId,
      weekDay        : userPrescription.weekDay,
      dayTime        : userPrescription.dayTime,
    }
  })

  if (_userPrescription) return _userPrescription.dataValues

  return (yield UserPrescription.create(userPrescription)).dataValues;
})

/**
 * Expose models/user
 */
exports = module.exports = User
