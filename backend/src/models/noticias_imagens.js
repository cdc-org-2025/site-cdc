
import { DataTypes, Model } from "sequelize";

class NoticiasImagem extends Model {
  static init(sequelize) {
    return super.init({
      imagem_url: DataTypes.TEXT,
      ordem_exibicao: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: "noticias_imagens",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Noticia, { foreignKey: "noticia_id" });
  }
}

export default NoticiasImagem;
