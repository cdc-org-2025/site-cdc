
import db from "../models/index.js";

class ProgramasController {
  static async index(req, res) {
    const programas = await db.Programa.findAll();
    return res.json(programas);
  }

  static async show(req, res) {
    const programa = await db.Programa.findByPk(req.params.id);
    if (!programa) return res.status(404).json({ error: "Programa não encontrado" });
    return res.json(programa);
  }

  static async store(req, res) {
    const novo = await db.Programa.create(req.body);
    return res.status(201).json(novo);
  }

  static async update(req, res) {
    const programa = await db.Programa.findByPk(req.params.id);
    if (!programa) return res.status(404).json({ error: "Programa não encontrado" });

    await programa.update(req.body);
    return res.json(programa);
  }

  static async destroy(req, res) {
    const programa = await db.Programa.findByPk(req.params.id);
    if (!programa) return res.status(404).json({ error: "Programa não encontrado" });

    await programa.destroy();
    return res.status(204).send();
  }
}

export default ProgramasController;
