'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tableName = 'conteudo_secoes';
      
      // 1. Tenta remover a chave primária existente.
      // O nome pode variar entre bancos de dados (ex: 'PRIMARY' vs 'conteudo_secoes_pkey').
      try {
        await queryInterface.removeConstraint(tableName, `${tableName}_pkey`, { transaction });
      } catch (e) {
        console.warn(`Constraint ${tableName}_pkey not found, trying "PRIMARY". This is expected.`);
        try {
            await queryInterface.removeConstraint(tableName, 'PRIMARY', { transaction });
        } catch (e2) {
            console.warn(`Constraint "PRIMARY" not found. The primary key may have been already removed.`);
        }
      }
      
      // 2. Adiciona a nova coluna 'id', sendo explícito sobre a chave primária.
      await queryInterface.addColumn(tableName, 'id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        // ▼▼▼ GARANTIMOS QUE SEJA A CHAVE PRIMÁRIA ▼▼▼
        primaryKey: true,
        // ▲▲▲ FIM DA CORREÇÃO ▲▲▲
        first: true, 
      }, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    // A função 'down' da resposta anterior já está correta.
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const tableName = 'conteudo_secoes';
      await queryInterface.removeColumn(tableName, 'id', { transaction });
      await queryInterface.addConstraint(tableName, {
        fields: ['secao'],
        type: 'primary key',
        name: `${tableName}_pkey`
      }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};