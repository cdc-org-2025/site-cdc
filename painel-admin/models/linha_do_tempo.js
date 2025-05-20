// models/LinhaDoTempo.js
import { Model, DataTypes } from 'sequelize';

export class LinhaDoTempo extends Model {
  static init(sequelize) {
    return super.init({
      titulo: DataTypes.STRING,
      ano: DataTypes.INTEGER,
      conteudo: DataTypes.TEXT,
      // url_imagem: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     return this.getDataValue('url_imagem')
      //   },
      // },
      
    }, { sequelize, tableName: 'linha_do_tempo', timestamps: false })
  }

  static associate(models) {
    this.hasMany(models.LinhaDoTempoImagem, {
      foreignKey: 'linha_do_tempo_id',
      as: 'imagens'
    })
  }
}

