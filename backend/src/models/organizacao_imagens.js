
import { DataTypes, Model } from "sequelize";

class OrganizacaoImagem extends Model {
  static init(sequelize) {
    return super.init({
      imagem_url: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: "organizacao_imagens",
      timestamps: false,
    });
  }

  static associate(models) {
     
    this.belongsTo(models.Organizacao, { foreignKey: "organizacao_id",  as: 'organizacao' });
  }
}

export default OrganizacaoImagem;
