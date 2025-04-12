
import db from "../models/index.js";

class InscricoesOportunidadesController {
  static async index(req, res) {
    const inscricoes = await db.InscricaoOportunidade.findAll();
    return res.json(inscricoes);
  }

  static async show(req, res) {
    const inscricao = await db.InscricaoOportunidade.findByPk(req.params.id);
    if (!inscricao) return res.status(404).json({ error: "Inscrição não encontrada" });
    return res.json(inscricao);
  }

  static async store(req, res) {
    const nova = await db.InscricaoOportunidade.create(req.body);
    return res.status(201).json(nova);
  }

  static async update(req, res) {
    const inscricao = await db.InscricaoOportunidade.findByPk(req.params.id);
    if (!inscricao) return res.status(404).json({ error: "Inscrição não encontrada" });

    await inscricao.update(req.body);
    return res.json(inscricao);
  }

  static async destroy(req, res) {
    const inscricao = await db.InscricaoOportunidade.findByPk(req.params.id);
    if (!inscricao) return res.status(404).json({ error: "Inscrição não encontrada" });

    await inscricao.destroy();
    return res.status(204).send();
  }
}

export default InscricoesOportunidadesController;
