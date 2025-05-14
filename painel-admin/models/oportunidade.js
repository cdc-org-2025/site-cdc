import { Model, DataTypes } from 'sequelize';

export class Oportunidade extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      descricao: DataTypes.TEXT,
    }, { sequelize, tableName: 'oportunidades', timestamps: false });
  }
}
