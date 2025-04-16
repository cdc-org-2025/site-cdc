'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('Contato', 'contato');
  },

  async down(queryInterface) {
    await queryInterface.renameTable('contato', 'Contato');
  }
};
