import { Model, DataTypes } from 'sequelize';

export class Lideranca extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
      cargo: DataTypes.STRING(100),
      email: DataTypes.STRING(50),
      url_imagem: {
        type: DataTypes.STRING,
        allowNull: true
      },
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
    }, {
      sequelize,
      tableName: 'lideranca',
      timestamps: false
    })
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
