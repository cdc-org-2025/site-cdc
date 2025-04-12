
import db from "../models/index.js";

class ContatoController {
  static async index(req, res) {
    const contatos = await db.Contato.findAll();
    return res.json(contatos);
  }

  static async show(req, res) {
    const contato = await db.Contato.findByPk(req.params.id);
    if (!contato) return res.status(404).json({ error: "Contato não encontrado" });
    return res.json(contato);
  }

  static async store(req, res) {
    const novo = await db.Contato.create(req.body);
    return res.status(201).json(novo);
  }

  static async update(req, res) {
    const contato = await db.Contato.findByPk(req.params.id);
    if (!contato) return res.status(404).json({ error: "Contato não encontrado" });

    await contato.update(req.body);
    return res.json(contato);
  }

  static async destroy(req, res) {
    const contato = await db.Contato.findByPk(req.params.id);
    if (!contato) return res.status(404).json({ error: "Contato não encontrado" });

    await contato.destroy();
    return res.status(204).send();
  }
}

export default ContatoController;
