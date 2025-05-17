import { Model, DataTypes } from 'sequelize';

export class Publicacao extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      documento_url: DataTypes.STRING,
      url_imagem: DataTypes.STRING, // imagem de capa
      area_id: DataTypes.INTEGER,

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
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}
