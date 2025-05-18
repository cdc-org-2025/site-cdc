import { Op } from "sequelize";
import db from "../models/index.js";

class NoticiasController {
  static async index(req, res) {
    try {
      const noticias = await db.Noticia.findAll({
        attributes: ['id', 'titulo', 'tempo_leitura', 'tipo', 'imagem_capa', 'autor', 'data_publicacao', 'area_ids'],
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
        order: [['data_publicacao', 'DESC']]
      });

      // Restante do código permanece igual
      const todasAreas = await db.Area.findAll({
        attributes: ['id', 'nome']
      });

      const areasMap = todasAreas.reduce((map, area) => {
        map[area.id] = area;
        return map;
      }, {});

      const response = noticias.map(noticia => {
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
          areas: areas,
          imagens: noticia.imagens || [], // ← Aqui também deve usar o mesmo alias
          categorias: noticia.Categorias || []
        };
      });

      return res.json(response);
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

  // static async showNews(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { area_id } = req.query;
  //     const where = {};

  //     if (id) {
  //       where.id = { [Op.ne]: id };
  //     }

  //     if (area_id) {
  //       where.area_ids = { [Op.contains]: [parseInt(area_id)] };
  //     }

  //     const noticias = await db.Noticia.findAll({
  //       where,
  //       attributes: ['id', 'titulo', 'tempo_leitura', 'tipo', 'imagem_capa', 'autor', 'data_publicacao', 'area_ids'],
  //       limit: 3,
  //       order: [["data_publicacao", "DESC"]],
  //     });

  //     // Buscar todas as áreas de uma vez para otimização
  //     const todasAreas = await db.Area.findAll({
  //       attributes: ['id', 'nome']
  //     });

  //     // Criar mapa de áreas para acesso rápido
  //     const areasMap = todasAreas.reduce((map, area) => {
  //       map[area.id] = area;
  //       return map;
  //     }, {});

  //     const response = noticias.map(noticia => {
  //       // Mapear area_ids para array de objetos de áreas
  //       const areas = noticia.area_ids
  //         ? noticia.area_ids
  //           .filter(id => areasMap[id])
  //           .map(id => ({
  //             id: areasMap[id].id,
  //             nome: areasMap[id].nome
  //           }))
  //         : [];

  //       return {
  //         ...noticia.get({ plain: true }),
  //         areas: areas
  //       };
  //     });

  //     return res.json(response);
  //   } catch (error) {
  //     console.error("Erro ao buscar notícias:", error);
  //     return res.status(500).json({ error: "Erro ao buscar notícias" });
  //   }
  // }

}

export default NoticiasController;