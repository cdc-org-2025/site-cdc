'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('noticias', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          titulo: Sequelize.STRING(255),
          tempo_leitura: Sequelize.STRING,
          tipo: Sequelize.ENUM('noticias', 'publicacoes'),
          conteudo: Sequelize.JSON,
          data_publicacao: Sequelize.DATE,
          area_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('noticias');
  }
};
