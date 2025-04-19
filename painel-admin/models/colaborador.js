import { Model, DataTypes } from 'sequelize';

export class Colaborador extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
      cargo: DataTypes.STRING(100),
      email: DataTypes.STRING(50),
      url_imagem: DataTypes.STRING,
      area_id: DataTypes.INTEGER,
    }, { sequelize, tableName: 'colaboradores', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
