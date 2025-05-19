
import { DataTypes, Model } from "sequelize";

class Area extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
    }, {
      sequelize,
      tableName: "areas",
      timestamps: false,
    });
  }

  static associate(models) {
    // this.hasMany(models.Lideranca, { foreignKey: 'area_id' });
    // this.hasMany(models.Programa, { foreignKey: 'area_id' });
    // this.hasMany(models.Publicacao, { foreignKey: 'area_id' });
    // this.hasMany(models.Transparencia, { foreignKey: 'area_id' });
    // this.hasMany(models.Noticia, { foreignKey: 'area_id' });
  }
}

export default Area;
