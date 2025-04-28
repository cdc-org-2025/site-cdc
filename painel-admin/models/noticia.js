import { Model, DataTypes } from 'sequelize';

export class Noticia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(255),
      tempo_leitura: DataTypes.STRING, // tempo em minutos
      tipo: {
        type: DataTypes.ENUM("noticias", "publicacoes"),
        defaultValue: "noticias",
      },
      conteudo: {
        type: DataTypes.JSON,
        defaultValue: [],
      },              // lista de elementos com type/content/html
      html_original: DataTypes.TEXT,    // campo extra para versão renderizada
      imagem_capa: DataTypes.STRING,    // URL
      autor: DataTypes.STRING(255),
      data_publicacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // seta data atual ao criar
      },
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_id');
        },
        set(value) {
          this.setDataValue('area_id', value);
        }
      },
    }, { sequelize, tableName: 'noticias', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
    this.belongsToMany(models.Categoria, { through: 'noticias_categorias', foreignKey: 'noticia_id' });
  }
}
