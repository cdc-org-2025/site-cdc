import { Model, DataTypes } from 'sequelize';

export class Categoria extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
    }, { sequelize, tableName: 'categorias', timestamps: false });
  }

  static associate(models) {
    this.belongsToMany(models.Noticia, { through: 'noticias_categorias', foreignKey: 'categoria_id' });
  }
}
