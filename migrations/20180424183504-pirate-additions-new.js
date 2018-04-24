"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.addColumn("Pirates", "nick_name", Sequelize.STRING, {
        allowNull: false
      }),
      queryInterface.addColumn("Pirates", "rank", Sequelize.STRING, {
        allowNull: false
      }),
      queryInterface.addColumn("Pirates", "beard", Sequelize.INTEGER, {
        allowNull: false
      }),
      queryInterface.addColumn("Pirates", "worth", Sequelize.INTEGER, {
        allowNull: false
      }),
      queryInterface.addColumn("Pirates", "birth_country", Sequelize.STRING, {
        allowNull: false
      }),
      queryInterface.addColumn("Pirates", "date_of_death", Sequelize.DATE, {
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
    return [
      queryInterface.removeColumn("Pirates", "nick_name"),
      queryInterface.removeColumn("Pirates", "rank"),
      queryInterface.removeColumn("Pirates", "worth"),
      queryInterface.removeColumn("Pirates", "beard"),
      queryInterface.removeColumn("Pirates", "birth_country"),
      queryInterface.removeColumn("Pirates", "date_of_death")
    ];
  }
};
