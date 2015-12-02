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
          },
          allowNull : false
        },
        medicineId : {
          type       : Sequelize.INTEGER,
          references : {
            model : 'medicines',
            key   : 'id'
          },
          allowNull : false
        },
        count : {
          type : Sequelize.INTEGER
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
