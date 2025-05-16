
import db from "../models/index.js";

class ParceirosController {
  static async index(req, res) {
    const parceiros = await db.Parceiro.findAll();
    return res.json(parceiros);
  }
}

export default ParceirosController;