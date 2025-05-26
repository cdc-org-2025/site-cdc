'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banner', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          pagina: Sequelize.ENUM('inicio', 'institucional', 'programas', 'noticias', 'publicacoes', 'contato'),
          url_img: Sequelize.STRING,
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('banner');
  }
};
