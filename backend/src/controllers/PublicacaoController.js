
import db from "../models/index.js";

class PublicacaoController {
  static async index(req, res) {
    const publicacoes = await db.Publicacao.findAll();
    return res.json(publicacoes);
  }

  static async show(req, res) {
    const publicacao = await db.Publicacao.findByPk(req.params.id);
    if (!publicacao) return res.status(404).json({ error: "Publicação não encontrada" });
    return res.json(publicacao);
  }

  static async store(req, res) {
    const nova = await db.Publicacao.create(req.body);
    return res.status(201).json(nova);
  }

  static async update(req, res) {
    const publicacao = await db.Publicacao.findByPk(req.params.id);
    if (!publicacao) return res.status(404).json({ error: "Publicação não encontrada" });

    await publicacao.update(req.body);
    return res.json(publicacao);
  }

  static async destroy(req, res) {
    const publicacao = await db.Publicacao.findByPk(req.params.id);
    if (!publicacao) return res.status(404).json({ error: "Publicação não encontrada" });

    await publicacao.destroy();
    return res.status(204).send();
  }
}

export default PublicacaoController;
