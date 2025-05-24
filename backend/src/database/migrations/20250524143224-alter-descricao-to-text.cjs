'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona a coluna 'titulo'
    await queryInterface.changeColumn('programas', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: true, // ou false, se necessário
    });

    await queryInterface.changeColumn('programas', 'resumo', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn('programas', 'subtitulo', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('programas', 'descricao', {
      type: Sequelize.STRING(255),
    });

    await queryInterface.changeColumn('programas', 'resumo', {
      type: Sequelize.STRING(255),
    });

    await queryInterface.changeColumn('programas', 'subtitulo', {
      type: Sequelize.STRING(255),
    });
  }
};
