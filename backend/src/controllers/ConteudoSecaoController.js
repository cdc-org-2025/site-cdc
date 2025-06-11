import db from "../models/index.js"; // Ajuste o caminho se necessário

class ConteudoSecaoController {
    static async index(req, res) {
        try {
            const { secao } = req.query;
            const whereClause = {}; // Cláusula de busca vazia por padrão

            // Se um parâmetro 'secao' for fornecido, adiciona ao filtro
            if (secao) {
                whereClause.secao = secao;
            }

            // Busca no banco usando o model ConteudoSecao
            const conteudos = await db.ConteudoSecao.findAll({
                where: whereClause
            });

            if (!conteudos.length) {
                return res.status(404).json({ error: 'Nenhum conteúdo encontrado para os critérios fornecidos.' });
            }

            return res.json(conteudos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar conteúdos de seção.' });
        }
    }
}

export default ConteudoSecaoController;