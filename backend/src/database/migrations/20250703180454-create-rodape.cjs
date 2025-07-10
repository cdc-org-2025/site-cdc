'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rodape", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      horario_funcionamento: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rodape");
  },
};
