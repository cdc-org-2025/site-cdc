'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'titulo'
    await queryInterface.addColumn('dados_bancarios', 'chave_pix', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('dados_bancarios', 'chave_pix');
  }
};
