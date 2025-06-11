// controllers/SearchController.js

import { Op } from 'sequelize';
import db from '../models/index.js'; // Ajuste o caminho conforme sua estrutura

class SearchController {
  static async search(req, res) {
    try {
      const { q } = req.query;

      if (!q || q.trim() === '') {
        return res.status(400).json({ error: 'O termo de busca não pode ser vazio.' });
      }

      const searchTerm = `%${q}%`;
      const whereClause = { where: { titulo: { [Op.like]: searchTerm } } };

      // 1. Executa as buscas em paralelo nas três tabelas
      const [noticias, transparencias, programas] = await Promise.all([
        db.Noticia.findAll(whereClause),
        db.Transparencia.findAll(whereClause),
        db.Programa.findAll(whereClause), // Adicionada a busca em Programas
      ]);

      // 2. Mapeia e padroniza os resultados
      const resultadosPadronizados = [
        ...noticias.map(item => ({
          id: item.id,
          titulo: item.titulo,
          tipo: 'noticia',
          imagem_capa: item.imagem_capa, // Campo já está correto
        })),
        ...transparencias.map(item => ({
          id: item.id,
          titulo: item.titulo,
          tipo: 'transparencia',
          imagem_capa: item.url_imagem, // Renomeia 'url_imagem' para 'imagem_capa'
        })),
        ...programas.map(item => ({
          id: item.id,
          titulo: item.titulo,
          tipo: 'programa',
          imagem_capa: item.url_image_capa, // Renomeia 'url_image_capa' para 'imagem_capa'
        })),
      ];
      
      // 3. Resposta
      if (resultadosPadronizados.length === 0) {
        return res.status(404).json({ message: 'Nenhum resultado encontrado.' });
      }

      return res.json(resultadosPadronizados);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro interno ao realizar a busca.' });
    }
  }
}

export default SearchController;