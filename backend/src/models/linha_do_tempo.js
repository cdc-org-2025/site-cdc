import { Model, DataTypes } from 'sequelize'

class LinhaDoTempo extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      ano: DataTypes.INTEGER,
      conteudo: DataTypes.STRING,
    }, { sequelize, tableName: 'linha_do_tempo', timestamps: false });
  }

  static associate(models) {
    this.hasMany(models.LinhaDoTempoImagem, {
      foreignKey: 'linha_do_tempo_id',
      as: 'imagens',
    });
  }
}

export default LinhaDoTempo
