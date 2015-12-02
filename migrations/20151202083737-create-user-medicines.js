'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('userMedicines',
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
          }
        },
        medicineId : {
          type       : Sequelize.INTEGER,
          references : {
            model : 'medicines',
            key   : 'id'
          }
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
    queryInterface.dropTable('userMedicines')
  }
}
