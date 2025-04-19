import { Model, DataTypes } from 'sequelize';

export class LinhaDoTempo extends Model {
  static init(sequelize) {
    return super.init({
      ano: DataTypes.INTEGER,
      conteudo: DataTypes.TEXT,
    }, { sequelize, tableName: 'linha_do_tempo', timestamps: false });
  }
}
