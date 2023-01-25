'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(
      'position_his',
      'user_wallet',
      {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'users',
          key: 'wallet',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.changeColumn(
      'dividend_his',
      'company_wallet',
      {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'companys',
          key: 'wallet',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'position_his',
      'user_wallet'
    );

    await queryInterface.removeColumn(
      'dividend_his',
      'company_wallet'
    );
  }
};
