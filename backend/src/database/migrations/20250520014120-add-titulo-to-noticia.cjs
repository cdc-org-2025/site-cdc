'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'titulo'
    await queryInterface.addColumn('noticias', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('noticias', 'titulo');
  }
};
