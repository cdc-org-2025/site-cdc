'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('areas', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          nome: { type: Sequelize.STRING(100) },
          descricao: { type: Sequelize.TEXT },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('areas');
  }
};
