
import { DataTypes, Model } from "sequelize";

export class Inidicador extends Model {
  static init(sequelize) {
    return super.init({
      descricao: DataTypes.STRING,
      quantidade: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: "inidicador",
      timestamps: false,
    });
  }

  static associate(models) {
  }
}
