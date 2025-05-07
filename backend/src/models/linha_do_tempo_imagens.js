// models/LinhaDoTempoImagem.js

import { Model, DataTypes } from 'sequelize'

class LinhaDoTempoImagem extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'linha_do_tempo_imagens',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.LinhaDoTempo, {
      foreignKey: 'linha_do_tempo_id',
      as: 'linhaDoTempo',
    });
  }
}

export default LinhaDoTempoImagem;
