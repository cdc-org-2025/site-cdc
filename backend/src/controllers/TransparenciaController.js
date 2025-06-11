
import db from "../models/index.js";

class TransparenciaController {
  static async index(req, res) {
    try {
      // 1. Lê os area_id da query string (?area_id=1,2,3)
      const areaIdsQuery = req.query.area_id
        ? req.query.area_id.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
        : [];

      // 2. Busca todos os documentos de transparência
      const docs = await db.Transparencia.findAll({
        attributes: ['id', 'titulo', 'url_imagem', 'documento_url', 'area_ids'],
      });

      // 3. Busca todas as áreas
      const allAreas = await db.Area.findAll({
        attributes: ['id', 'nome']
      });

      // 4. Cria um mapa de id => área
      const areasMap = allAreas.reduce((map, area) => {
        map[area.id] = area;
        return map;
      }, {});

      // 5. Se houver filtro de area_id, filtra os documentos
      const docsFiltrados = areaIdsQuery.length > 0
        ? docs.filter(doc => Array.isArray(doc.area_ids) && doc.area_ids.some(id => areaIdsQuery.includes(id)))
        : docs;

      // 6. Formata os documentos
      const response = docsFiltrados.map(doc => {
        const areas = doc.area_ids
          ? doc.area_ids
            .filter(id => areasMap[id])
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
          areas: areas
        };
      });

      // 7. Prepara os filtros únicos de área
      const areasFiltro = [];
      const areaIdsSet = new Set();

      response.forEach(element => {
        element.areas.forEach(area => {
          if (!areaIdsSet.has(area.id)) {
            areaIdsSet.add(area.id);
            areasFiltro.push(area);
          }
        });
      });

      // 8. Retorna os dados e os filtros
      return res.json({
        data: response,
        areas_filtro: areasFiltro
      });

    } catch (error) {
      console.error("Erro ao listar documentos de transparência:", error);
      return res.status(500).json({ error: "Erro ao listar documentos de transparência" });
    }
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
