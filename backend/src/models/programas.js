
import { DataTypes, Model } from "sequelize";

class Programa extends Model {
  static init(sequelize) {
    return super.init({
      conteudo: DataTypes.JSON,
      url_image_capa: DataTypes.STRING,
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "programas",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: "area_id" });
  }
}

export default Programa;
