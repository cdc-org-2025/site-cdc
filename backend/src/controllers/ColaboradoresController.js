
import db from "../models/index.js";

class ColaboradoresController {
  static async index(req, res) {
    const colaboradores = await db.Colaborador.findAll();
    return res.json(colaboradores);
  }

  static async show(req, res) {
    const colaborador = await db.Colaborador.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });
    return res.json(colaborador);
  }

  static async store(req, res) {
    const novo = await db.Colaborador.create(req.body);
    return res.status(201).json(novo);
  }

  static async update(req, res) {
    const colaborador = await db.Colaborador.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });

    await colaborador.update(req.body);
    return res.json(colaborador);
  }

  static async destroy(req, res) {
    const colaborador = await db.Colaborador.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });

    await colaborador.destroy();
    return res.status(204).send();
  }
}

export default ColaboradoresController;
