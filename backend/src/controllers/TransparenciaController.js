
import db from "../models/index.js";

class TransparenciaController {
  static async index(req, res) {
    const docs = await db.Transparencia.findAll({
      attributes: ['id', 'titulo', 'url_imagem', 'documento_url', 'area_ids'],
    });

    const allAreas = await db.Area.findAll({
      attributes: ['id', 'nome']
    });

    const areasMap = allAreas.reduce((map, area) => {
      map[area.id] = area;
      return map;
    }, {});

    const response = docs.map(doc => {
      // Mapear os IDs de áreas para objetos de áreas completos
      const areas = doc.area_ids
        ? doc.area_ids
          .filter(id => areasMap[id]) // Filtra IDs que existem no banco
          .map(id => ({
            id: areasMap[id].id,
            nome: areasMap[id].nome
          }))
        : [];

      return {
        id: doc.id,
        titulo: doc.titulo,
        url_imagem: doc.url_imagem,
        documento_url: doc.documento_url,
        areas: areas // Retorna o array de objetos de áreas
      };
    });

    return res.json(response);

    // return res.json(docs);
  }

  static async show(req, res) {
    const documento = await db.Transparencia.findByPk(req.params.id, {
      attributes: ['id', 'titulo', 'url_imagem', 'documento_url', 'area_ids'],
    });

    if (!documento) return res.status(404).json({ error: "Documento não encontrado" });

    // Buscar as áreas específicas deste documento
    const areas = await db.Area.findAll({
      where: {
        id: documento.area_ids || []
      },
      attributes: ['id', 'nome']
    });

    // Extrai os dados do documento sem o area_ids
    const { area_ids, ...documentoData } = documento.get({ plain: true });

    const response = {
      ...documentoData,
      areas: areas.map(area => ({
        id: area.id,
        nome: area.nome
      }))
    };

    return res.json(response);
  }

}

export default TransparenciaController;
