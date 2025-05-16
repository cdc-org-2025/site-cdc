
import db from "../models/index.js";

class PerguntasFrenquenteController {
  static async index(req, res) {
    const perguntasFrenquente = await db.PerguntaFrequente.findAll();
    return res.json(perguntasFrenquente);
  }
}

export default PerguntasFrenquenteController;