'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('publicacao', 'documento_drive_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('publicacao', 'documento_drive_id', {
      type: Sequelize.STRING, // ou outro tipo original da coluna
      allowNull: true,        // ou false, conforme o caso original
    });
  }
};
