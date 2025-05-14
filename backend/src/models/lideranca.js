
import { DataTypes, Model } from "sequelize";

class Lideranca extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING,
      cargo: DataTypes.STRING,
      email: DataTypes.STRING,
      url_imagem: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "liderenca",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: "area_id" });
  }
}

export default Lideranca;
