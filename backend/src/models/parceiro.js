
import { DataTypes, Model } from "sequelize";

class Parceiro extends Model {
  static init(sequelize) {
    return super.init({
      url_img: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "parceiro",
      timestamps: false,
    });
  }
}

export default Parceiro;
