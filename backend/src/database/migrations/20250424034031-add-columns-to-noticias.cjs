'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('noticias', 'html_original', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('noticias', 'imagem_capa', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('noticias', 'autor', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('noticias', 'html_original');
    await queryInterface.removeColumn('noticias', 'imagem_capa');
    await queryInterface.removeColumn('noticias', 'autor');
  }
};
