
import { DataTypes, Model } from "sequelize";

class Publicacao extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      url_imagem: DataTypes.STRING,
      documento_url: DataTypes.TEXT,
      documento_drive_id: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "publicacao",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: "area_id" });
  }
}

export default Publicacao;
