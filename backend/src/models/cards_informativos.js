import { Model, DataTypes } from 'sequelize';

class CardInformativo extends Model {
    static init(sequelize) {
        return super.init({
            titulo: DataTypes.STRING(100),
            descricao: DataTypes.STRING,
            url_imagem: DataTypes.STRING,
            tipo: DataTypes.ENUM('missao', 'visao', 'organizacao'),
        }, { sequelize, tableName: 'card_informativo', timestamps: false });

    }

    static associate(models) {
    }
}

export default CardInformativo