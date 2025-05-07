import { Model, DataTypes } from 'sequelize';

export class Transparencia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      url_imagem: DataTypes.STRING(100),
      documento_url: DataTypes.STRING(100),
      documento_drive_id: DataTypes.STRING(100),
      area_id: DataTypes.INTEGER,
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_id');
        },
        set(value) {
          this.setDataValue('area_id', value);
        }
      },
    }, { sequelize, tableName: 'transparencia', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
