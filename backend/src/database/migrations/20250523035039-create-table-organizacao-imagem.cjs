'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizacao_imagens', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          imagem_url: Sequelize.TEXT,
          organizacao_id: {
            type: Sequelize.INTEGER,
            references: { model: 'organizacao', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organizacao_imagens');
  }
};
