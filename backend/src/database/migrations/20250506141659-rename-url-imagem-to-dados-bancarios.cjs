'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('dados_bancarios', 'url_img_qrcode', 'url_imagem');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('dados_bancarios', 'url_img_qrcode', 'url_imagem');
  }
};
