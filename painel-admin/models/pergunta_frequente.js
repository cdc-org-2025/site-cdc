import { Model, DataTypes } from 'sequelize';

export class PerguntaFrequente extends Model {
  static init(sequelize) {
    return super.init({
      pergunta: DataTypes.STRING,
      resposta: DataTypes.TEXT,
    }, { sequelize, tableName: 'perguntas_frequentes', timestamps: false });
  }
}
