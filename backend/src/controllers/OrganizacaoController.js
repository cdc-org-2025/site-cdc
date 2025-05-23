
import db from "../models/index.js";

class OrganizacaoController {
    static async index(req, res) {
        try {
            const organizacao = await db.Organizacao.findAll({
                include: [{
                    model: db.OrganizacaoImagem,
                    as: 'imagens',
                    attributes: ['imagem_url'], // ← CORRIGIDO AQUI
                }],
            });

            const response = organizacao.map(item => ({
                id: item.id,
                titulo: item.titulo,
                descricao: item.descricao,
                imagens: item.imagens.map(img => img.imagem_url), // ← E AQUI TAMBÉM
            }));


            return res.json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar dados da organização' });
        }
    }
}


export default OrganizacaoController;