import { DataTypes, Model } from "sequelize";

class Noticia extends Model {
  static init(sequelize) {
    return super.init({
      titulo_temp: DataTypes.TEXT,
      titulo: DataTypes.STRING,
      tempo_leitura: DataTypes.STRING, // tempo em minutos
      tipo: DataTypes.ENUM("noticias", "publicacoes"),
      conteudo: DataTypes.JSON,         // lista de elementos com type/content/html
      html_original: DataTypes.TEXT,    // campo extra para versão renderizada
      imagem_capa: DataTypes.STRING,    // URL
      autor: DataTypes.STRING(255),
      data_publicacao: DataTypes.DATE,
      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // <- Aqui está a mágica
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: "noticias",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.NoticiasImagem, {
      as: 'imagens', // ← alias correto
      foreignKey: 'noticia_id'
    });

    this.belongsToMany(models.Categoria, {
      through: 'noticias_categorias',
      foreignKey: 'noticia_id',
      otherKey: 'categoria_id',
      as: 'Categorias'
    });

  }
}

export default Noticia;

