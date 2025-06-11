import { Op } from "sequelize";
import db from "../models/index.js";

class NoticiasController {
  static async index(req, res) {
    try {
      // 1. Lê os area_id da query string (ex: ?area_id=1,2)
      const areaIdsQuery = req.query.area_id
        ? req.query.area_id.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
        : [];

      // 2. Busca todas as notícias
      const noticias = await db.Noticia.findAll({
        attributes: ['id', 'titulo', 'tempo_leitura', 'tipo', 'imagem_capa', 'autor', 'data_publicacao', 'area_ids'],
        include: [
          {
            model: db.NoticiasImagem,
            as: 'imagens',
            attributes: ['id', 'imagem_url']
          },
          {
            model: db.Categoria,
            as: 'Categorias',
            through: { attributes: [] },
            attributes: ['id', 'nome']
          }
        ],
        order: [['data_publicacao', 'DESC']]
      });

      // 3. Filtra se `area_id` foi fornecido
      const noticiasFiltradas = areaIdsQuery.length > 0
        ? noticias.filter(n => Array.isArray(n.area_ids) && n.area_ids.some(id => areaIdsQuery.includes(id)))
        : noticias;

      // 4. Busca todas as áreas
      const todasAreas = await db.Area.findAll({
        attributes: ['id', 'nome']
      });

      const areasMap = todasAreas.reduce((map, area) => {
        map[area.id] = area;
        return map;
      }, {});

      // 5. Formata a resposta
      const response = noticiasFiltradas.map(noticia => {
        const areas = noticia.area_ids
          ? noticia.area_ids
            .filter(id => areasMap[id])
            .map(id => ({
              id: areasMap[id].id,
              nome: areasMap[id].nome
            }))
          : [];

        return {
          id: noticia.id,
          titulo: noticia.titulo,
          tempo_leitura: noticia.tempo_leitura,
          tipo: noticia.tipo,
          imagem_capa: noticia.imagem_capa,
          autor: noticia.autor,
          data_publicacao: noticia.data_publicacao,
          areas,
          imagens: noticia.imagens || [],
          categorias: noticia.Categorias || []
        };
      });

      // 6. Prepara os filtros únicos de área
      const areasFiltro = [];
      const areaIdsSet = new Set();

      response.forEach(element => {
        element.areas.forEach(area => {
          if (!areaIdsSet.has(area.id)) {
            areaIdsSet.add(area.id);
            areasFiltro.push(area);
          }
        });
      });

      return res.json({
        data: response,
        areas_filtro: areasFiltro
      });

    } catch (error) {
      console.error("Erro ao listar notícias:", error);
      return res.status(500).json({ error: "Erro ao listar notícias" });
    }
  }



  static async show(req, res) {
    try {
      const noticia = await db.Noticia.findByPk(req.params.id, {
        attributes: ['id', 'titulo', 'tempo_leitura', 'tipo', 'conteudo', 'html_original', 'imagem_capa', 'autor', 'data_publicacao', 'area_ids'],
        include: [
          {
            model: db.NoticiasImagem,
            as: 'imagens', // ← Deve corresponder ao alias definido na associação
            attributes: ['id', 'imagem_url']
          },
          {
            model: db.Categoria,
            as: 'Categorias', // ← deve corresponder ao alias no model
            through: { attributes: [] },
            attributes: ['id', 'nome']
          }
        ],
      });

      if (!noticia) {
        return res.status(404).json({ error: "Notícia não encontrada" });
      }

      // Buscar áreas específicas desta notícia
      const areas = await db.Area.findAll({
        where: {
          id: noticia.area_ids || []
        },
        attributes: ['id', 'nome']
      });

      // Extrair dados da notícia sem area_ids
      const { area_ids, ...noticiaData } = noticia.get({ plain: true });

      const response = {
        ...noticiaData,
        areas: areas.map(area => ({
          id: area.id,
          nome: area.nome
        })),
        imagens: noticia.NoticiasImagens || [],
        categorias: noticia.Categorias || []
      };

      return res.json(response);
    } catch (error) {
      console.error("Erro ao buscar notícia:", error);
      return res.status(500).json({ error: "Erro ao buscar notícia" });
    }
  }

}

export default NoticiasController;