
import db from "../models/index.js";

class CardInformativoController {
  static async index(req, res) {
    const cardInformativo = await db.CardInformativo.findAll();
    return res.json(cardInformativo);
  }
}

export default CardInformativoController;