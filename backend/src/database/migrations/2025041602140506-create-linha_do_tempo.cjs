'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('linha_do_tempo', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          ano: Sequelize.INTEGER,
          conteudo: Sequelize.JSON,
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('linha_do_tempo');
  }
};
