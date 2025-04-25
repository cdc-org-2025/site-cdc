import { DataTypes, Model } from "sequelize";

class Noticia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(255),
      tempo_leitura: DataTypes.STRING, // tempo em minutos
      tipo: DataTypes.ENUM("noticias", "publicacoes"),
      conteudo: DataTypes.JSON,         // lista de elementos com type/content/html
      html_original: DataTypes.TEXT,    // campo extra para versão renderizada
      imagem_capa: DataTypes.STRING,    // URL
      autor: DataTypes.STRING(255),
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
