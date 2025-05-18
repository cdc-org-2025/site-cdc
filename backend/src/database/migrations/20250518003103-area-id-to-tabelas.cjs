'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = ['noticias', 'transparencia', 'publicacao', 'programas'];

    for (const table of tables) {
      await queryInterface.addColumn(table, 'area_ids', {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = ['noticias', 'transparencia', 'publicacao', 'programas'];

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'area_ids');
    }
  }
};
