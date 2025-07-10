import { DataTypes, Model } from "sequelize";

class Rodape extends Model {
  static init(sequelize) {
    return super.init({
      endereco: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      horario_funcionamento: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: "rodape",
      timestamps: false,
    });
  }
}

export default Rodape;
