'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('colaboradores', 'liderenca');
  },

  async down(queryInterface) {
    await queryInterface.renameTable('liderenca', 'colaboradores');
  }
};
