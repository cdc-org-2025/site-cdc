
import db from "../models/index.js";

class LinhaTempoController {
  static async index(req, res) {
    try {
      const dadosBancarios = await db.LinhaDoTempo.findAll({
        include: [{
          model: db.LinhaDoTempoImagem,
          as: 'imagens',
          attributes: ['url_imagem'], // Só queremos as URLs
        }],
      });

      // Formatar para retornar apenas array de urls
      const response = dadosBancarios.map(item => ({
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