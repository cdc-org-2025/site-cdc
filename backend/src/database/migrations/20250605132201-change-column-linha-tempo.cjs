'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('linha_do_tempo', 'conteudo', {
      type: Sequelize.TEXT,
      allowNull: true, // ou false, dependendo da regra anterior
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('linha_do_tempo', 'conteudo', {
      type: Sequelize.STRING,
      allowNull: true, // mesmo valor do `up`, para reverter com segurança
    });
  }
};
