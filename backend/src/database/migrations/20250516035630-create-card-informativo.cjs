'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("card_informativo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_imagem: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('missao', 'visao', 'organizacao'),
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("card_informativo");
  },
};
