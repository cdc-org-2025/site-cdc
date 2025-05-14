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
      area_id: DataTypes.INTEGER,

      // Campo virtual para área
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_id')
        },
        set(value) {
          this.setDataValue('area_id', value)
        }
      },

      // Campo virtual para upload (não persistido)
      uploadImagem: {
        type: DataTypes.VIRTUAL,
        get() {
          return null
        },
        set() {}
      }
    }, {
      sequelize,
      tableName: 'lideranca',
      timestamps: false
    })
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
