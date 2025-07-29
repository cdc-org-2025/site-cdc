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
      },
      link_facebook: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_youtube: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_instagram: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_linkedin: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "rodape",
      timestamps: false,
    });
  }
}

export default Rodape;
