'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('oportunidades', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          titulo: Sequelize.STRING,
          descricao: Sequelize.JSON,
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('oportunidades');
  }
};
