import { DataTypes, Model } from "sequelize";

export class Organizacao extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.TEXT,
      descricao: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: "organizacao",
      timestamps: false,
    });
  }

  static associate(models) {
    this.hasMany(models.OrganizacaoImagem, {
      as: 'imagens', // ← alias correto
      foreignKey: 'organizacao_id'
    });
  }
}

