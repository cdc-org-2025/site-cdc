
import { DataTypes, Model } from "sequelize";

class Transparencia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(255),
      url_imagem: DataTypes.STRING,
      documento_url: DataTypes.TEXT,
      documento_drive_id: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "transparencia",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: "area_id" });
  }
}

export default Transparencia;
