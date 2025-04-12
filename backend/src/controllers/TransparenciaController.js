
import db from "../models/index.js";

class TransparenciaController {
  static async index(req, res) {
    const docs = await db.Transparencia.findAll();
    return res.json(docs);
  }

  static async show(req, res) {
    const doc = await db.Transparencia.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: "Documento não encontrado" });
    return res.json(doc);
  }

  static async store(req, res) {
    const novo = await db.Transparencia.create(req.body);
    return res.status(201).json(novo);
  }

  static async update(req, res) {
    const doc = await db.Transparencia.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: "Documento não encontrado" });

    await doc.update(req.body);
    return res.json(doc);
  }

  static async destroy(req, res) {
    const doc = await db.Transparencia.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: "Documento não encontrado" });

    await doc.destroy();
    return res.status(204).send();
  }
}

export default TransparenciaController;
