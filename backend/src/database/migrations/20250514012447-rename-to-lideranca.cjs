'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('liderenca', 'lideranca');
  },

  async down(queryInterface) {
    await queryInterface.renameTable('lideranca', 'liderenca');
  }
};
