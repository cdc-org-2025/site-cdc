
import { DataTypes, Model } from "sequelize";

class DadosBancario extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
      banco: DataTypes.STRING,
      agencia: DataTypes.STRING,
      titular_conta: DataTypes.STRING,
    }, {
      sequelize,
      tableName: "dados_bancarios",
      timestamps: false,
    });
  }
}

export default DadosBancario;
