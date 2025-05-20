import { Model, DataTypes } from 'sequelize';

export class Noticia extends Model {
  static init(sequelize) {
    return super.init({
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
      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // array de inteiros
        allowNull: true
      },
      // Campo virtual para área
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_ids')
        },
        set(value) {
          this.setDataValue('area_ids', value)
        }
      },
      // titulo: {
      //   type: DataTypes.TEXT,
      // },
      titulo: DataTypes.TEXT,

      uploadCapa: {
        type: DataTypes.VIRTUAL,
        get() {
          return null;
        },
        set(value) {
        },



      }
    }, { sequelize, tableName: 'noticias', timestamps: false });
  }

  static associate(models) {
    this.belongsToMany(models.Categoria, { through: 'noticias_categorias', foreignKey: 'noticia_id' });
  }
}
