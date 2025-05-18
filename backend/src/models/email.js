
import { DataTypes, Model } from "sequelize";

class Email extends Model {
  static init(sequelize) {
    return super.init({
      email: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "email",
      timestamps: false,
    });
  }

  static associate(models) {
  }
}

export default Email;
