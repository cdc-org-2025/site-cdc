import { Model, DataTypes } from 'sequelize';

export class DadosBancario extends Model {
  static init(sequelize) {
    return super.init({
      banco: DataTypes.STRING(100),
      agencia: DataTypes.STRING(20),
      titular_conta: DataTypes.STRING(100),
      url_imagem: {
        type: DataTypes.STRING,
        allowNull: true
      },
      uploadImagem: {
        type: DataTypes.VIRTUAL,
        get() {
          return null
        },
        set() {}
      }
    }, { sequelize, tableName: 'dados_bancarios', timestamps: false });
  }
}
