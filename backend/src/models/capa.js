import { Model, DataTypes } from 'sequelize';

class Capa extends Model {
    static init(sequelize) {
        return super.init({
            url_img: DataTypes.STRING,
            pagina: DataTypes.ENUM('inicio', 'institucional', 'programas', 'noticias', 'publicacoes', 'contato', 'indicadores', 'trabalhe_conosco', 'doacao'),
            titulo: DataTypes.TEXT,
        }, { sequelize, tableName: 'capa', timestamps: false });

    }

    static associate(models) {
    }
}

export default Capa