'use strict';

module.exports = {
  async up  (queryInterface, Sequelize){
    await queryInterface.createTable('programa_imagens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url_imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      programa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'programas',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('programa_imagens');
  }
};

