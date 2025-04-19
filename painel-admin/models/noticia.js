import { Model, DataTypes } from 'sequelize';

export class Noticia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      conteudo: DataTypes.TEXT,
      data_publicacao: DataTypes.DATE,
      area_id: DataTypes.INTEGER,
    }, { sequelize, tableName: 'noticias', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
    this.belongsToMany(models.Categoria, { through: 'noticias_categorias', foreignKey: 'noticia_id' });
  }
}
