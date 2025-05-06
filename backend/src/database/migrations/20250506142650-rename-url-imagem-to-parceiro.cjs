'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('parceiro', 'url_img', 'url_imagem');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('parceiro', 'url_img', 'url_imagem');
  }
};
