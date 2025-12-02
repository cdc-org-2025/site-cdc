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
      const searchTerm = q ? q.trim() : '';

      const areaIdsQuery = req.query.area_id
        ? req.query.area_id
            .split(',')
            .map((id) => parseInt(id.trim(), 10))
            .filter((id) => !isNaN(id))
        : [];

      // Validação: precisa de pelo menos um dos filtros
      if ((!searchTerm || searchTerm === '') && areaIdsQuery.length === 0) {
        return res.status(400).json({
          error: 'É necessário fornecer um termo de busca (q) ou IDs de área (area_id).',
        });
      }

      // 2. Prepara cláusulas de busca por título para Noticia e Programa
      const whereNoticias = {};
      const whereProgramas = {};

      if (searchTerm !== '') {
        whereNoticias.titulo = { [Op.iLike]: `%${searchTerm}%` };
        whereProgramas.titulo = { [Op.iLike]: `%${searchTerm}%` };
      }

      // 3. Executa as buscas em paralelo
      const [noticias, programas, transparencias, todasAreas] = await Promise.all([
        db.Noticia.findAll({
          where: {
            ...whereNoticias,
          },
        }),

        db.Programa.findAll({
          where: {
            ...whereProgramas,
          },
        }),

        // TRANSPARÊNCIA: usa SQL bruto exatamente como o teste que funcionou
        (async () => {
          const replacements = {};
          let whereSQL = '';

          if (searchTerm !== '') {
            whereSQL = 'WHERE titulo ILIKE :titulo';
            replacements.titulo = `%${searchTerm}%`;
          }

          const [rows] = await db.sequelize.query(
            `
              SELECT *
              FROM public.transparencia
              ${whereSQL}
            `,
            {
              replacements,
              // type: db.Sequelize.QueryTypes.SELECT  // opcional, dependendo da sua config
            }
          );

          return rows;
        })(),

        db.Area.findAll({ attributes: ['id', 'nome'] }), // Busca todas as áreas para mapeamento
      ]);

      // Cria um mapa de áreas para busca rápida (ID -> {id, nome})
      const areasMap = todasAreas.reduce((map, area) => {
        map[area.id] = area.toJSON();
        return map;
      }, {});

      // 4. Combina e padroniza os resultados, mantendo os area_ids
      const resultadosCombinados = [
        ...noticias.map((item) => ({
          ...item.toJSON(),
          tipo: 'noticia',
          imagem_capa: item.imagem_capa,
        })),
        ...transparencias.map((item) => ({
          ...item, // já vem como objeto simples da query raw
          tipo: 'transparencia',
          imagem_capa: item.url_imagem,
          documento_url: item.documento_url
        })),
        ...programas.map((item) => ({
          ...item.toJSON(),
          tipo: 'programa',
          imagem_capa: item.url_image_capa,
        })),
      ];

      // 5. Filtra os resultados combinados pelos IDs de área, se fornecidos
      const resultadosFiltradosPorArea =
        areaIdsQuery.length > 0
          ? resultadosCombinados.filter(
              (item) =>
                Array.isArray(item.area_ids) &&
                item.area_ids.some((id) => areaIdsQuery.includes(id))
            )
          : resultadosCombinados;

      // 6. Formata a resposta final, substituindo area_ids pelos objetos de área completos
      const dadosFinais = resultadosFiltradosPorArea.map((item) => {
        const areasCompletas = item.area_ids
          ? item.area_ids.map((id) => areasMap[id]).filter(Boolean)
          : [];

        return {
          id: item.id,
          titulo: item.titulo,
          tipo: item.tipo,
          imagem_capa: item.imagem_capa,
          areas: areasCompletas,
          documento_url: item?.documento_url
        };
      });

      // 7. Gera a lista de filtros de área únicos com base nos resultados finais
      const areasFiltro = [];
      const areaIdsEncontrados = new Set();
      dadosFinais.forEach((item) => {
        item.areas.forEach((area) => {
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
      console.error('Erro ao realizar busca:', error);
      return res
        .status(500)
        .json({ error: 'Ocorreu um erro interno ao realizar a busca.' });
    }
  }
}

export default SearchController;
