
import { DataTypes, Model } from "sequelize";

class Area extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
      descricao: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: "areas",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.Noticia, { foreignKey: "area_id" });
    this.hasMany(models.Colaborador, { foreignKey: "area_id" });
    this.hasMany(models.Programa, { foreignKey: "area_id" });
    this.hasMany(models.Transparencia, { foreignKey: "area_id" });
    this.hasMany(models.Publicacao, { foreignKey: "area_id" });
  }
}

export default Area;
