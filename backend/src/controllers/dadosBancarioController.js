
import db from "../models/index.js";

class DadosBancarioController {
  static async index(req, res) {
    const dadosBancario = await db.DadosBancario.findAll();
    return res.json(dadosBancario);
  }
}

export default DadosBancarioController;