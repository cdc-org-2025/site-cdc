'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'titulo'
    await queryInterface.addColumn('noticias', 'titulo_temp', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('noticias', 'titulo_temp');
  }
};
