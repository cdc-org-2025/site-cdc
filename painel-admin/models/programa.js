import { Model, DataTypes } from 'sequelize';

export class Programa extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(100),
      descricao: DataTypes.TEXT,
      // area_id: DataTypes.INTEGER,
      url_image_capa: DataTypes.STRING,
      subtitulo: DataTypes.STRING,
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
      resumo: DataTypes.STRING,


      // uploadCapa: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     return null;
      //   },
      //   set(value) {
      //   }
      // }
    }, {
      sequelize,
      tableName: 'programas',
      timestamps: false,
    });
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: 'area_id' });
    this.hasMany(models.ProgramaImagens, {
      foreignKey: 'programa_id',
      as: 'imagens',
    });
  }
}
