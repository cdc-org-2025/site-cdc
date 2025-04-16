'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          nome: { type: Sequelize.STRING(100) },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categorias');
  }
};
