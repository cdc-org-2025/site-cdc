
import { DataTypes, Model } from "sequelize";

class Transparencia extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING(255),
      url_imagem: DataTypes.STRING,
      documento_url: DataTypes.TEXT,

      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // <- Aqui está a mágica
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: "transparencia",
      timestamps: false,
    });
  }

  static associate(models) {
    // this.belongsTo(models.Area, { foreignKey: "area_id" });
  }
}

export default Transparencia;
