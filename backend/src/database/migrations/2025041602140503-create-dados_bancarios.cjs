'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dados_bancarios', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          url_img_qrcode: Sequelize.STRING,
          banco: Sequelize.STRING,
          agencia: Sequelize.STRING,
          titular_conta: Sequelize.STRING,
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dados_bancarios');
  }
};
