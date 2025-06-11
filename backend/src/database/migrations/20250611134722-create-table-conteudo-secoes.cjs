'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conteudo_secoes', {
      secao: {
        type: Sequelize.ENUM(
          'contato',
          'organizacao',
          'entrada-programas',
          'liderancas',
          'transparencia'
        ),
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resumo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conteudo_secoes');
  }
};