
import { Op } from "sequelize";
import db from "../models/index.js";

class NoticiasController {
  static async index(req, res) {
    try {
      const noticias = await db.Noticia.findAll();
      return res.json(noticias);
    } catch (error) {
      console.error("Erro ao listar notícias:", error);
      return res.status(500).json({ error: "Erro ao listar notícias" });
    }
  }

  static async show(req, res) {
    try {
      const noticia = await db.Noticia.findByPk(req.params.id);
      if (!noticia) return res.status(404).json({ error: "Notícia não encontrada" });
      return res.json(noticia);
    } catch (error) {
      console.error("Erro ao buscar notícia:", error);
      return res.status(500).json({ error: "Erro ao buscar notícia" });
    }
  }

  static async showNews(req, res) {
    try {
      const { id } = req.params;
      const { area_id } = req.query;
      const where = {};

      if (id) {
        where.id = { [Op.ne]: id };
      }

      if (area_id) {
        where.area_id = area_id;
      }

      const noticias = await db.Noticia.findAll({
        where,
        limit: 3,
        order: [["data_publicacao", "DESC"]],
      });

      return res.json(noticias);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      return res.status(500).json({ error: "Erro ao buscar notícias" });
    }
  }

  static async store(req, res) {
    try {
      const nova = await db.Noticia.create(req.body);
      return res.status(201).json(nova);
    } catch (error) {
      console.error("Erro ao criar notícia:", error);
      return res.status(500).json({ error: "Erro ao criar notícia" });
    }
  }

  static async update(req, res) {
    try {
      const noticia = await db.Noticia.findByPk(req.params.id);
      if (!noticia) return res.status(404).json({ error: "Notícia não encontrada" });

      await noticia.update(req.body);
      return res.json(noticia);
    } catch (error) {
      console.error("Erro ao atualizar notícia:", error);
      return res.status(500).json({ error: "Erro ao atualizar notícia" });
    }
  }

  static async destroy(req, res) {
    try {
      const noticia = await db.Noticia.findByPk(req.params.id);
      if (!noticia) return res.status(404).json({ error: "Notícia não encontrada" });

      await noticia.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
      return res.status(500).json({ error: "Erro ao deletar notícia" });
    }
  }
}

export default NoticiasController;
