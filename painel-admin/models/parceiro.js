import { Model, DataTypes } from 'sequelize';

export class Parceiro extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
      uploadImagem: {
        type: DataTypes.VIRTUAL,
        get() {
          return null
        },
        set() {}
      }
    }, { sequelize, tableName: 'parceiro', timestamps: false });
  }
}
