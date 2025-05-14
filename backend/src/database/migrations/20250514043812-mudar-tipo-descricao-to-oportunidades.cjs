module.exports = {
  async up (queryInterface, Sequelize){
    // Altera a coluna 'conteudo' de JSON para STRING
    await queryInterface.changeColumn('oportunidades', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverte a coluna 'conteudo' para JSON (caso precise voltar)
    await queryInterface.changeColumn('oportunidades', 'descricao', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  }
};
