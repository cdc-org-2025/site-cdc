
import { DataTypes, Model } from "sequelize";

class Categoria extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
    }, {
      sequelize,
      tableName: "categorias",
      timestamps: false,
    });
  }

  static associate(models) {
    // this.belongsToMany(models.Noticia, {
    //   through: models.NoticiasCategoria,
    //   foreignKey: "categoria_id",
    // });
  }
}

export default Categoria;
