
import { DataTypes, Model } from "sequelize";

class LinhaDoTempo extends Model {
  static init(sequelize) {
    return super.init({
      ano: DataTypes.INTEGER,
      conteudo: DataTypes.JSON,
    }, {
      sequelize,
      tableName: "linha_do_tempo",
      timestamps: false,
    });
  }
}

export default LinhaDoTempo;
