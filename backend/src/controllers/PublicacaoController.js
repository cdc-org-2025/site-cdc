import db from "../models/index.js";

class PublicacaoController {
  static async index(req, res) {
    const publicacoes = await db.Publicacao.findAll({
      attributes: ['id', 'titulo', 'url_imagem', 'documento_url', 'area_ids'],
      include: [{
        model: db.PublicacaoImagens,
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

    const response = publicacoes.map(pub => {
      // Mapear os IDs de áreas para objetos de áreas completos
      const areas = pub.area_ids 
        ? pub.area_ids
            .filter(id => areasMap[id])
            .map(id => ({
              id: areasMap[id].id,
              nome: areasMap[id].nome
            }))
        : [];

      return {
        id: pub.id,
        titulo: pub.titulo,
        url_imagem: pub.url_imagem,
        documento_url: pub.documento_url,
        areas: areas,
        imagens: pub.imagens || []
      };
    });

    return res.json(response);
  }

  static async show(req, res) {
    const publicacao = await db.Publicacao.findByPk(req.params.id, {
      attributes: ['id', 'titulo', 'url_imagem', 'documento_url', 'area_ids'],
      include: [{
        model: db.PublicacaoImagens,
        as: 'imagens',
        attributes: ['id', 'url_imagem']
      }]
    });
    
    if (!publicacao) return res.status(404).json({ error: "Publicação não encontrada" });

    // Buscar as áreas específicas desta publicação
    const areas = await db.Area.findAll({
      where: {
        id: publicacao.area_ids || []
      },
      attributes: ['id', 'nome']
    });

    // Extrai os dados da publicação sem o area_ids
    const { area_ids, ...publicacaoData } = publicacao.get({ plain: true });
    
    const response = {
      ...publicacaoData,
      areas: areas.map(area => ({
        id: area.id,
        nome: area.nome
      })),
      imagens: publicacao.imagens || []
    };

    return res.json(response);
  }
}

export default PublicacaoController;