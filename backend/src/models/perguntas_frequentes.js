
import { DataTypes, Model } from "sequelize";

class PerguntaFrequente extends Model {
  static init(sequelize) {
    return super.init({
      pergunta: DataTypes.TEXT,
      resposta: DataTypes.TEXT,
      ordem_exibicao: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: "perguntas_frequentes",
      timestamps: false,
    });
  }
}

export default PerguntaFrequente;
