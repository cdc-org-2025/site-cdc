'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('perguntas_frequentes', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          pergunta: Sequelize.TEXT,
          resposta: Sequelize.TEXT,
          ordem_exibicao: Sequelize.INTEGER,
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('perguntas_frequentes');
  }
};
