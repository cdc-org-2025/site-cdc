'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('colaboradores', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          nome: Sequelize.STRING,
          cargo: Sequelize.STRING,
          email: Sequelize.STRING,
          url_imagem: Sequelize.STRING,
          area_id: {
            type: Sequelize.INTEGER,
            references: { model: 'areas', key: 'id' },
            onDelete: 'CASCADE'
          },
        });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('colaboradores');
  }
};
