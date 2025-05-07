module.exports = {
  async up (queryInterface, Sequelize){
    // Adiciona a coluna 'titulo'
    await queryInterface.addColumn('linha_do_tempo', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Altera a coluna 'conteudo' de JSON para STRING
    await queryInterface.changeColumn('linha_do_tempo', 'conteudo', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove a coluna 'titulo'
    await queryInterface.removeColumn('linha_do_tempo', 'titulo');

    // Reverte a coluna 'conteudo' para JSON (caso precise voltar)
    await queryInterface.changeColumn('linha_do_tempo', 'conteudo', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  }
};
