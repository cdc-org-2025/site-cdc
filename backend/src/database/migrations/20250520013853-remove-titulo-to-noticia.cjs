'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('noticias', 'titulo');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('noticias', 'titulo', {
      type: Sequelize.STRING, // ou outro tipo original da coluna
      allowNull: true,        // ou false, conforme o caso original
    });
  }
};
