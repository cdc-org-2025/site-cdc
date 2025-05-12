import { Model, DataTypes } from 'sequelize';

export class ProgramaImagens extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
      programa_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'programa_imagens',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Programa, {
      foreignKey: 'programa_id',
      as: 'programa'
    });
  }
}