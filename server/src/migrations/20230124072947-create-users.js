'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      wallet: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      faucet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: 'Unnamed',
      },
      stoken: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};