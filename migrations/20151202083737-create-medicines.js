'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('medicines',
      {
        id : {
          type          : Sequelize.INTEGER,
          primaryKey    : true,
          autoIncrement : true
        },
        name : {
          type      : Sequelize.STRING,
          allowNull : false
        },
        picture : {
          type : Sequelize.STRING
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
    queryInterface.dropTable('medicines')
  }
};
