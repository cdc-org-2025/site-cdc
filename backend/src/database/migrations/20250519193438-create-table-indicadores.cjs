'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inidicador', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      descricao: { type: Sequelize.STRING },
      quantidade: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inidicador');
  }
};
