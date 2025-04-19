import { Model, DataTypes } from 'sequelize';

export class Transparencia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      imagem_url: DataTypes.STRING(100),
      documento_url: DataTypes.STRING(100),
      documento_drive_id: DataTypes.STRING(100),
      area_id: DataTypes.INTEGER,
    }, { sequelize, tableName: 'transparencia', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
