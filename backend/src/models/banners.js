import { Model, DataTypes } from 'sequelize';

class Banners extends Model {
    static init(sequelize) {
        return super.init({
            url_img: DataTypes.STRING,
            pagina: DataTypes.ENUM('inicio', 'institucional', 'programas', 'noticias', 'publicacoes', 'contato'),
        }, { sequelize, tableName: 'banner', timestamps: false });

    }

    static associate(models) {
    }
}

export default Banners