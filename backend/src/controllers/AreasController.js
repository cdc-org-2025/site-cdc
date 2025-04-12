import db from "../models/index.js";

class AreasController {
  static async index(req, res) {
    const areas = await db.Area.findAll();
    return res.json(areas);
  }

  static async show(req, res) {
    const area = await db.Area.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: "Área não encontrada" });
    return res.json(area);
  }

  static async store(req, res) {
    const nova = await db.Area.create(req.body);
    return res.status(201).json(nova);
  }

  static async update(req, res) {
    const area = await db.Area.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: "Área não encontrada" });

    await area.update(req.body);
    return res.json(area);
  }

  static async destroy(req, res) {
    const area = await db.Area.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: "Área não encontrada" });

    await area.destroy();
    return res.status(204).send();
  }
}

export default AreasController;
