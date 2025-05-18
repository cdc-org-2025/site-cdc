import { Model, DataTypes } from 'sequelize';

export class Transparencia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      url_imagem: DataTypes.STRING(100),
      documento_url: DataTypes.STRING(100),
      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // array de inteiros
        allowNull: true
      },
      // Campo virtual para área
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_ids')
        },
        set(value) {
          this.setDataValue('area_ids', value)
        }
      },
    }, { sequelize, tableName: 'transparencia', timestamps: false });
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
