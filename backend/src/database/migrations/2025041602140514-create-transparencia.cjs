'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transparencia', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          titulo: Sequelize.STRING(255),
          imagem_url: Sequelize.TEXT,
          documento_url: Sequelize.TEXT,
          documento_drive_id: Sequelize.STRING,
          area_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' },
            onDelete: 'CASCADE'
          }
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transparencia');
  }
};
