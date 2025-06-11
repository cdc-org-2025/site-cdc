'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // A lista completa de valores: os existentes + os novos.
    const newEnumValues = [
      'inicio',
      'institucional',
      'programas',
      'noticias',
      'publicacoes',
      'contato',
      'indicadores',         // <-- NOVO VALOR
      'trabalhe conosco'     // <-- NOVO VALOR
    ];

    await queryInterface.changeColumn('banner', 'pagina', {
      type: Sequelize.ENUM(...newEnumValues),
      allowNull: true, // Mantenha as outras propriedades da coluna, se houver.
    });
  },

  async down(queryInterface, Sequelize) {
    // A lista original de valores, sem os que foram adicionados.
    const originalEnumValues = [
      'inicio',
      'institucional',
      'programas',
      'noticias',
      'publicacoes',
      'contato'
    ];

    // ATENÇÃO: Reverter esta migration (down) irá falhar se existirem
    // registros no banco de dados usando os valores 'indicadores' ou 'Trabalhe Conosco'.
    // Você precisaria primeiro atualizar ou remover esses registros.
    await queryInterface.changeColumn('banner', 'pagina', {
      type: Sequelize.ENUM(...originalEnumValues),
      allowNull: true,
    });
  }
};