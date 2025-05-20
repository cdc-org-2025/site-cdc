
import { DataTypes, Model } from "sequelize";

class Inidicador extends Model {
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

export default Inidicador;
