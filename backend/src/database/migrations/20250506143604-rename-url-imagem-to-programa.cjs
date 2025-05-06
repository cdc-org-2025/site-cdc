'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('programas', 'url_image_capa', 'url_imagem');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('programas', 'url_image_capa', 'url_imagem');
  }
};
