
import { DataTypes, Model } from "sequelize";

class Programa extends Model {
  static init(sequelize) {
    return super.init({
      url_image_capa: DataTypes.STRING,
      titulo: DataTypes.STRING,
      subtitulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      resumo: DataTypes.STRING,
      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: "programas",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.ProgramaImagens, {
      foreignKey: 'programa_id',
      as: 'imagens',
    });
  }
}

export default Programa;
