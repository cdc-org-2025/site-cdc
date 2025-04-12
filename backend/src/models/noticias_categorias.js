
import { Model } from "sequelize";

class NoticiasCategoria extends Model {
  static init(sequelize) {
    return super.init({}, {
      sequelize,
      tableName: "noticias_categorias",
      timestamps: false,
    });
  }
}

export default NoticiasCategoria;
