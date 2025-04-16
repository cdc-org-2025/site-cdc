'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('noticias_imagens', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          imagem_url: Sequelize.TEXT,
          ordem_exibicao: Sequelize.INTEGER,
          noticia_id: {
            type: Sequelize.INTEGER,
            references: { model: 'noticias', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('noticias_imagens');
  }
};
