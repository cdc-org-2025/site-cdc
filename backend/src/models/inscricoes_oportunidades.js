
import { DataTypes, Model } from "sequelize";

class InscricaoOportunidade extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      apresentacao: DataTypes.STRING,
      url_documento: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "inscricoes_oportunidades",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Oportunidade, { foreignKey: "oportunidade_id" });
  }
}

export default InscricaoOportunidade;
