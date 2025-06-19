// controllers/SearchController.js

import { Op } from 'sequelize';
import db from '../models/index.js'; // Ajuste o caminho conforme sua estrutura

class SearchController {
  /**
   * @description Busca por um termo e/ou áreas nas tabelas Noticias, Transparencia e Programas.
   * @route GET /api/pesquisa?q=termo&area_id=1,2
   */
  static async search(req, res) {
    try {
      // 1. Lê os parâmetros da query
      const { q } = req.query;
      const areaIdsQuery = req.query.area_id
        ? req.query.area_id.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
        : [];

      // Validação: precisa de pelo menos um dos filtros
      if ((!q || q.trim() === '') && areaIdsQuery.length === 0) {
        return res.status(400).json({ error: 'É necessário fornecer um termo de busca (q) ou IDs de área (area_id).' });
      }

      // 2. Prepara a cláusula de busca por título (se houver)
      const whereClause = {};
      if (q && q.trim() !== '') {
        whereClause.titulo = { [Op.iLike]: `%${q}%` };
      }

      // 3. Executa as buscas em paralelo
      const [noticias, transparencias, programas, todasAreas] = await Promise.all([
        db.Noticia.findAll({ where: whereClause }),
        db.Publicacao.findAll({ where: whereClause }),
        db.Programa.findAll({ where: whereClause }),
        db.Area.findAll({ attributes: ['id', 'nome'] }), // Busca todas as áreas para mapeamento
      ]);

      // Cria um mapa de áreas para busca rápida (ID -> {id, nome})
      const areasMap = todasAreas.reduce((map, area) => {
        map[area.id] = area.toJSON();
        return map;
      }, {});

      // 4. Combina e padroniza os resultados, mantendo os area_ids
      const resultadosCombinados = [
        ...noticias.map(item => ({ ...item.toJSON(), tipo: 'noticia', imagem_capa: item.imagem_capa })),
        ...transparencias.map(item => ({ ...item.toJSON(), tipo: 'transparencia', imagem_capa: item.url_imagem })),
        ...programas.map(item => ({ ...item.toJSON(), tipo: 'programa', imagem_capa: item.url_image_capa })),
      ];

      // 5. Filtra os resultados combinados pelos IDs de área, se fornecidos
      const resultadosFiltradosPorArea = areaIdsQuery.length > 0
        ? resultadosCombinados.filter(item =>
            Array.isArray(item.area_ids) && item.area_ids.some(id => areaIdsQuery.includes(id))
          )
        : resultadosCombinados;

      // 6. Formata a resposta final, substituindo area_ids pelos objetos de área completos
      const dadosFinais = resultadosFiltradosPorArea.map(item => {
        const areasCompletas = item.area_ids
          ? item.area_ids.map(id => areasMap[id]).filter(Boolean) // .filter(Boolean) remove áreas não encontradas
          : [];

        // Retorna o objeto final sem o campo area_ids
        return {
          id: item.id,
          titulo: item.titulo,
          tipo: item.tipo,
          imagem_capa: item.imagem_capa,
          areas: areasCompletas, // Novo campo com os objetos de área
        };
      });

      // 7. Gera a lista de filtros de área únicos com base nos resultados finais
      const areasFiltro = [];
      const areaIdsEncontrados = new Set();
      dadosFinais.forEach(item => {
        item.areas.forEach(area => {
          if (!areaIdsEncontrados.has(area.id)) {
            areaIdsEncontrados.add(area.id);
            areasFiltro.push(area);
          }
        });
      });

      // 8. Resposta final
      if (dadosFinais.length === 0) {
        return res.status(404).json({ message: 'Nenhum resultado encontrado.' });
      }

      return res.json({
        data: dadosFinais,
        areas_filtro: areasFiltro,
      });

    } catch (error) {
      console.error("Erro ao realizar busca:", error);
      return res.status(500).json({ error: 'Ocorreu um erro interno ao realizar a busca.' });
    }
  }
}

export default SearchController;