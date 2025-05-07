import { Model, DataTypes } from 'sequelize';

export class Parceiro extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
    }, { sequelize, tableName: 'parceiro', timestamps: false });
  }
}
