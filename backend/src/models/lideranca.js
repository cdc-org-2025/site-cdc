
// import { DataTypes, Model } from "sequelize";

// class Lideranca extends Model {
//   static init(sequelize) {
//     return super.init({
//       nome: DataTypes.STRING,
//       cargo: DataTypes.STRING,
//       email: DataTypes.STRING,
//       url_imagem: DataTypes.STRING,
//     }, {
//       sequelize,
//       tableName: "lideranca",
//       timestamps: false,
//     });
//   }

//   static associate(models) {
//     this.belongsTo(models.Area, { foreignKey: "area_id" });
//   }
// }

// export default Lideranca;

import { DataTypes, Model } from "sequelize";

class Lideranca extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING,
      cargo: DataTypes.STRING,
      email: DataTypes.STRING,
      url_imagem: DataTypes.STRING,

      area_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // <- Aqui está a mágica
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: "lideranca",
      timestamps: false,
    });
  }

  static associate(models) {
    // this.belongsToMany(models.Area, {
    //   through: "area_lideranca",
    //   foreignKey: "lideranca_id",
    //   otherKey: "area_id"
    // });
  }
}

export default Lideranca;
