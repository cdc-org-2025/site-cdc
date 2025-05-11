// models/LinhaDoTempoImagem.js

import { Model, DataTypes } from 'sequelize'

class ProgramaImagens extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'programa_imagens',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Programa, {
      foreignKey: 'programa_id',
      as: 'programa',
    })
  }
}

export default ProgramaImagens;
