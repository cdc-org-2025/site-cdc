'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inscricoes_oportunidades', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          nome: Sequelize.STRING,
          email: Sequelize.STRING,
          apresentacao: Sequelize.STRING,
          url_documento: Sequelize.STRING,
          oportunidade_id: {
            type: Sequelize.INTEGER,
            references: { model: 'oportunidades', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inscricoes_oportunidades');
  }
};
