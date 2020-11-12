'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      nfid: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      imdbrating: {
        type: Sequelize.FLOAT
      },
      year: {
        type: Sequelize.INTEGER
      },
      vtype: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shows');
  }
};