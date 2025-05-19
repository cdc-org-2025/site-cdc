
import { DataTypes, Model } from "sequelize";

class Publicacao extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      url_imagem: DataTypes.STRING,
      documento_url: DataTypes.TEXT,
      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // <- Aqui está a mágica
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: "publicacao",
      timestamps: false,
    });
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: "area_id" });
    this.hasMany(models.PublicacaoImagens, {
      foreignKey: 'publicacao_id',
      as: 'imagens',
    });
  }
}

export default Publicacao;
