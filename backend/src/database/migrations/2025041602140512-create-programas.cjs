'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('programas', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          conteudo: Sequelize.JSON,
          url_image_capa: Sequelize.STRING,
          titulo: Sequelize.STRING,
          descricao: Sequelize.STRING,
          area_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' },
            onDelete: 'CASCADE'
          }
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('programas');
  }
};
