'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizacao', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          titulo: { type: Sequelize.TEXT },
          descricao: { type: Sequelize.TEXT },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organizacao');
  }
};
