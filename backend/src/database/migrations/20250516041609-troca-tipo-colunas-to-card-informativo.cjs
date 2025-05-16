'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('card_informativo', 'titulo', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.changeColumn('card_informativo', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('card_informativo', 'url_imagem', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.changeColumn('card_informativo', 'tipo', {
      type: Sequelize.ENUM('missao', 'visao', 'organizacao'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Voltando para NOT NULL, caso queira reverter
    await queryInterface.changeColumn('card_informativo', 'titulo', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    await queryInterface.changeColumn('card_informativo', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('card_informativo', 'url_imagem', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('card_informativo', 'tipo', {
      type: Sequelize.ENUM('missao', 'visao', 'organizacao'),
      allowNull: false,
    });
  }
};
