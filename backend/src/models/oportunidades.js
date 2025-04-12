
import { DataTypes, Model } from "sequelize";

class Oportunidade extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      descricao: DataTypes.JSON,
    }, {
      sequelize,
      tableName: "oportunidades",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.InscricaoOportunidade, { foreignKey: "oportunidade_id" });
  }
}

export default Oportunidade;
