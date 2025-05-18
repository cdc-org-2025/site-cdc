
import db from "../models/index.js";

class LiderancaController {
  static async index(req, res) {
    const liderancas = await db.Lideranca.findAll({
      attributes: ['id', 'nome', 'cargo', 'email', 'url_imagem', 'area_ids'],
    });

    const allAreas = await db.Area.findAll({
      attributes: ['id', 'nome']
    });

    const areasMap = allAreas.reduce((map, area) => {
      map[area.id] = area;
      return map;
    }, {});


    const response = liderancas.map(lider => {
      // Mapear os IDs de áreas para objetos de áreas completos
      const areas = lider.area_ids
        ? lider.area_ids
          .filter(id => areasMap[id]) // Filtra IDs que existem no banco
          .map(id => ({
            id: areasMap[id].id,
            nome: areasMap[id].nome
          }))
        : [];

      return {
        id: lider.id,
        nome: lider.nome,
        cargo: lider.cargo,
        email: lider.email,
        url_imagem: lider.url_imagem,
        areas: areas // Retorna o array de objetos de áreas
      };
    });

    return res.json(response);
  }

  static async show(req, res) {
    const lideranca = await db.Lideranca.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'cargo', 'email', 'url_imagem', 'area_ids'],
    });

    if (!lideranca) return res.status(404).json({ error: "Lider não encontrada" });

    const areas = await db.Area.findAll({
      where: {
        id: lideranca.area_ids || []
      },
      attributes: ['id', 'nome']
    });

    const response = {
      ...lideranca.get({ plain: true }),
      areas: areas.map(area => ({
        id: area.id,
        nome: area.nome
      }))
    };

    return res.json(response);
  }
}

export default LiderancaController;
