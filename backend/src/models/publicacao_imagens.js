// models/LinhaDoTempoImagem.js

import { Model, DataTypes } from 'sequelize'

class PublicacaoImagens extends Model {
  static init(sequelize) {
    return super.init({
      url_imagem: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'publicacao_imagens',
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.Publicacao, {
      foreignKey: 'publicacao_id',
      as: 'publicacao',
    })
  }
}

export default PublicacaoImagens;
