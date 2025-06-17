// models/ConteudoSecao.js

import { Model, DataTypes } from 'sequelize';

class ConteudoSecao extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      secao: {
        type: DataTypes.ENUM(
          'contato',
          'organizacao',
          'entrada-programas',
          'liderancas',
          'transparencia',
          'indicadores',
          'institucional'
        ),
        allowNull: false,
        unique: true, // se quiser garantir uma seção única
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resumo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'conteudo_secoes',
      timestamps: false,
    });
  }
}

export default ConteudoSecao;