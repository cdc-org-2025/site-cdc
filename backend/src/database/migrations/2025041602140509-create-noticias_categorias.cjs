'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('noticias_categorias', {
          noticia_id: {
            type: Sequelize.INTEGER,
            references: { model: 'noticias', key: 'id' },
            onDelete: 'CASCADE'
          },
          categoria_id: {
            type: Sequelize.INTEGER,
            references: { model: 'categorias', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('noticias_categorias');
  }
};
