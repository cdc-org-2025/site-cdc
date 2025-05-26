import db from "../models/index.js";

class ProgramasController {
  static async index(req, res) {
    const programas = await db.Programa.findAll({
      attributes: ['id', 'url_image_capa', 'titulo', 'subtitulo', 'resumo','descricao', 'area_ids' ],
      include: [{
        model: db.ProgramaImagens,
        as: 'imagens',
        attributes: ['id', 'url_imagem']
      }]
    });

    // Buscar todas as áreas de uma vez para otimização
    const todasAreas = await db.Area.findAll({
      attributes: ['id', 'nome']
    });

    // Criar um mapa de áreas para acesso rápido
    const areasMap = todasAreas.reduce((map, area) => {
      map[area.id] = area;
      return map;
    }, {});

    const response = programas.map(prog => {
      // Mapear os IDs de áreas para objetos de áreas completos
      const areas = prog.area_ids
        ? prog.area_ids
          .filter(id => areasMap[id])
          .map(id => ({
            id: areasMap[id].id,
            nome: areasMap[id].nome
          }))
        : [];

      return {
        id: prog.id,
        url_image_capa: prog.url_image_capa,
        titulo: prog.titulo,
        subtitulo: prog.subtitulo,
        descricao: prog.descricao,
        resumo: prog.resumo,
        areas: areas,
        imagens: prog.imagens || []
      };
    });

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

    return res.json({
      data: response,
      areas_filtro: areasFiltro
    });
  }

  static async show(req, res) {
    const programa = await db.Programa.findByPk(req.params.id, {
      attributes: ['id', 'url_image_capa', 'titulo', 'subtitulo', 'resumo','descricao', 'area_ids'],
      include: [{
        model: db.ProgramaImagens,
        as: 'imagens',
        attributes: ['id', 'url_imagem']
      }]
    });

    if (!programa) return res.status(404).json({ error: "Programa não encontrado" });

    // Buscar as áreas específicas deste programa
    const areas = await db.Area.findAll({
      where: {
        id: programa.area_ids || []
      },
      attributes: ['id', 'nome']
    });

    // Extrai os dados do programa sem o area_ids
    const { area_ids, ...programaData } = programa.get({ plain: true });

    const response = {
      ...programaData,
      areas: areas.map(area => ({
        id: area.id,
        nome: area.nome
      })),
      imagens: programa.imagens || []
    };

    return res.json(response);
  }
}

export default ProgramasController;