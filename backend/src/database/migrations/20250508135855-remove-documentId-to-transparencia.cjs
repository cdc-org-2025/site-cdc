'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('transparencia', 'documento_drive_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('transparencia', 'documento_drive_id', {
      type: Sequelize.STRING, // ou outro tipo original da coluna
      allowNull: true,        // ou false, conforme o caso original
    });
  }
};
