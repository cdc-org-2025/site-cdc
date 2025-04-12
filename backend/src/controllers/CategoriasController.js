
import db from "../models/index.js";

class CategoriasController {
  static async index(req, res) {
    const categorias = await db.Categoria.findAll();
    return res.json(categorias);
  }

  static async show(req, res) {
    const categoria = await db.Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
    return res.json(categoria);
  }

  static async store(req, res) {
    const nova = await db.Categoria.create(req.body);
    return res.status(201).json(nova);
  }

  static async update(req, res) {
    const categoria = await db.Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });

    await categoria.update(req.body);
    return res.json(categoria);
  }

  static async destroy(req, res) {
    const categoria = await db.Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });

    await categoria.destroy();
    return res.status(204).send();
  }
}

export default CategoriasController;
