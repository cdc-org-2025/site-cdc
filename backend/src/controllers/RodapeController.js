import db from "../models/index.js";

class RodapeController {
  static async index(req, res) {
    try {
      const rodape = await db.Rodape.findAll();
      return res.json(rodape);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar os dados do rodapé." });
    }
  }
}

export default RodapeController;
