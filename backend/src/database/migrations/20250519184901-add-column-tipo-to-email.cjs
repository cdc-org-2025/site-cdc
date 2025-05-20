'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'titulo'
    await queryInterface.addColumn('email', 'tipo', {
      type: Sequelize.ENUM('curriculo', 'contato'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('email', 'tipo');
  }
};
