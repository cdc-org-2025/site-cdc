import { Model, DataTypes } from 'sequelize';

export class Publicacao extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      documento_url: DataTypes.STRING,
      url_imagem: DataTypes.STRING, // imagem de capa
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

      // campo virtual só para AdminJS
      // uploadCapa: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     return null;
      //   },
      //   set(value) {
      //     // nada a fazer
      //   }
      // },
      uploadImagem: {
        type: DataTypes.VIRTUAL,
        get() {
          return null
        },
        set() { }
      }
    }, { sequelize, tableName: 'publicacao', timestamps: false });
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
