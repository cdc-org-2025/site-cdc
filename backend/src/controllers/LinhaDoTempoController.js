
import db from "../models/index.js";
import { Sequelize } from 'sequelize'

class LinhaTempoController {
  static async index(req, res) {
    try {
      const linhadotempo = await db.LinhaDoTempo.findAll({
        include: [{
          model: db.LinhaDoTempoImagem,
          as: 'imagens',
          attributes: ['url_imagem'],
        }],
        order: [
          [Sequelize.literal(`CASE WHEN ano = 0 THEN 1 ELSE 0 END`), 'ASC'], // Move ano=0 pro final
          ['ano', 'ASC']
        ]
      });

      const response = linhadotempo.map(item => ({
        id: item.id,
        titulo: item.titulo,
        ano: item.ano,
        conteudo: item.conteudo,
        imagens: item.imagens.map(img => img.url_imagem),
      }));

      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar dados da linha do tempo' });
    }
  }
}


export default LinhaTempoController;