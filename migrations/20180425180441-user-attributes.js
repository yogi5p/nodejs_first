"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("Users", "email", Sequelize.STRING, {
        allowNull: false
      }),
      queryInterface.addColumn("Users", "role", Sequelize.STRING, {
        allowNull: false
      }),
      queryInterface.addColumn("Users", "github_auth_id", Sequelize.INTEGER, {
        allowNull: false
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
