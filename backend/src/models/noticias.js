
import { DataTypes, Model } from "sequelize";

class Noticia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(255),
      tempo_leitura: DataTypes.STRING,
      tipo: DataTypes.ENUM("noticias", "publicacoes"),
      conteudo: DataTypes.JSON,
      data_publicacao: DataTypes.DATE,
    }, {
      sequelize,
      tableName: "noticias",
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: "area_id" });
    this.hasMany(models.NoticiasImagem, { foreignKey: "noticia_id" });
    this.belongsToMany(models.Categoria, {
      through: models.NoticiasCategoria,
      foreignKey: "noticia_id",
    });
  }
}

export default Noticia;
