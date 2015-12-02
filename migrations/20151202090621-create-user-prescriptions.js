'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('userPrescriptions',
      {
        id : {
          type          : Sequelize.INTEGER,
          primaryKey    : true,
          autoIncrement : true
        },
        userId : {
          type       : Sequelize.INTEGER,
          references : {
            model : 'users',
            key   : 'id'
          },
          allowNull : false
        },
        userMedicineId : {
          type       : Sequelize.INTEGER,
          references : {
            model : 'userMedicines',
            key   : 'id'
          },
          allowNull : false
        },
        weekDay : {
          type      : Sequelize.INTEGER,
          allowNull : false
        },
        dayTime : {
          type      : Sequelize.INTEGER,
          allowNull : false
        },
        count : {
          type : Sequelize.INTEGER
        },
        repeatUntil : {
          type : Sequelize.DATE
        },
        createdAt : {
          type : Sequelize.DATE
        },
        updatedAt : {
          type : Sequelize.DATE
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('userPrescriptions')
  }
}
