'use strict';

module.exports = {
  async up  (queryInterface, Sequelize){
    await queryInterface.createTable('publicacao_imagens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url_imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publicacao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'publicacao',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('publicacao_imagens');
  }
};

