import { Model, DataTypes } from 'sequelize';

export class Colaborador extends Model {
  static init(sequelize) {
    return super.init({
      nome: DataTypes.STRING(100),
      cargo: DataTypes.STRING(100),
      email: DataTypes.STRING(50),
      url_imagem: DataTypes.STRING,
      area_id: DataTypes.INTEGER,
      
      // Aqui criamos o campo VIRTUAL
      areaDeAtuacao: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('area_id');
        },
        set(value) {
          this.setDataValue('area_id', value);
        }
      },
      // Aqui criamos o campo VIRTUAL
      imagem: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.getDataValue('url_imagem');
        },
        set(value) {
          this.setDataValue('url_imagem', value);
        }
      },

    }, { sequelize, tableName: 'colaboradores', timestamps: false });
  }

  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
}

