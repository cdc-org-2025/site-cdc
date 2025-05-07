import { Model, DataTypes } from 'sequelize';

export class Programa extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      descricao: DataTypes.TEXT,
      area_id: DataTypes.INTEGER,
      url_imagem: DataTypes.STRING
    }, { sequelize, tableName: 'programas', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
