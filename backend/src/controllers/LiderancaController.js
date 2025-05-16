
import db from "../models/index.js";

class LiderancaController {
  static async index(req, res) {
    const liderancas = await db.Lideranca.findAll({
      include: [{
        model: db.Area,
        attributes: ['nome', 'id'], // Apenas o nome da área
      }],
      attributes: { exclude: ['area_id'] }, // Exclui area_id do resultado
    });


    const response = liderancas.map(lider => ({
      id: lider.id,
      nome: lider.nome,
      cargo: lider.cargo,
      email: lider.email,
      url_imagem: lider.url_imagem,
      area: lider.Area?.nome || null,
      area_id: lider.Area?.id || null,
    }));

    return res.json(response);
  }

  static async show(req, res) {
    const colaborador = await db.Lideranca.findByPk(req.params.id);
    if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });
    return res.json(colaborador);
  }

  // static async store(req, res) {
  //   const novo = await db.Colaborador.create(req.body);
  //   return res.status(201).json(novo);
  // }

  // static async update(req, res) {
  //   const colaborador = await db.Colaborador.findByPk(req.params.id);
  //   if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });

  //   await colaborador.update(req.body);
  //   return res.json(colaborador);
  // }

  // static async destroy(req, res) {
  //   const colaborador = await db.Colaborador.findByPk(req.params.id);
  //   if (!colaborador) return res.status(404).json({ error: "Colaborador não encontrado" });

  //   await colaborador.destroy();
  //   return res.status(204).send();
  // }
}

export default LiderancaController;
