'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('transparencia', 'imagem_url', 'url_imagem');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('transparencia', 'imagem_url', 'url_imagem');
  }
};
