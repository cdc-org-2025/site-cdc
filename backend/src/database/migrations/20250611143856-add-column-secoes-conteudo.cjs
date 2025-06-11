'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Adiciona o novo campo 'id'
    await queryInterface.addColumn('conteudo_secoes', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    });

    // 2. Remove a primary key atual da tabela (precisa recriar constraint)
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Postgres não permite múltiplas primary keys, então removemos a existente
      await queryInterface.removeConstraint('conteudo_secoes', 'conteudo_secoes_pkey', { transaction });

      // 3. Define 'id' como nova primary key
      await queryInterface.addConstraint('conteudo_secoes', {
        fields: ['id'],
        type: 'primary key',
        name: 'conteudo_secoes_pkey', // nome pode ser o mesmo do anterior
        transaction,
      });
    });

    // 4. Adiciona UNIQUE em secao (opcional mas recomendado para manter valor exclusivo)
    await queryInterface.addConstraint('conteudo_secoes', {
      fields: ['secao'],
      type: 'unique',
      name: 'conteudo_secoes_secao_unique',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('conteudo_secoes', 'conteudo_secoes_secao_unique');
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint('conteudo_secoes', 'conteudo_secoes_pkey', { transaction });

      // Restaura 'secao' como primary key
      await queryInterface.addConstraint('conteudo_secoes', {
        fields: ['secao'],
        type: 'primary key',
        name: 'conteudo_secoes_pkey',
        transaction,
      });
    });

    await queryInterface.removeColumn('conteudo_secoes', 'id');
  },
};
