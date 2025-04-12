
import db from "../models/index.js";

class OportunidadesController {
  static async index(req, res) {
    const oportunidades = await db.Oportunidade.findAll();
    return res.json(oportunidades);
  }

  static async show(req, res) {
    const oportunidade = await db.Oportunidade.findByPk(req.params.id);
    if (!oportunidade) return res.status(404).json({ error: "Oportunidade não encontrada" });
    return res.json(oportunidade);
  }

  static async store(req, res) {
    const nova = await db.Oportunidade.create(req.body);
    return res.status(201).json(nova);
  }

  static async update(req, res) {
    const oportunidade = await db.Oportunidade.findByPk(req.params.id);
    if (!oportunidade) return res.status(404).json({ error: "Oportunidade não encontrada" });

    await oportunidade.update(req.body);
    return res.json(oportunidade);
  }

  static async destroy(req, res) {
    const oportunidade = await db.Oportunidade.findByPk(req.params.id);
    if (!oportunidade) return res.status(404).json({ error: "Oportunidade não encontrada" });

    await oportunidade.destroy();
    return res.status(204).send();
  }
}

export default OportunidadesController;
