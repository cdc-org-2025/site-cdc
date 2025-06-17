
import db from "../models/index.js";


class BannerController {
    static async index(req, res) {
        try {
            const { pagina } = req.query;
            const banner = await db.Capa.findAll({
                where: { pagina: pagina }
            });


            if (!banner.length) {
                return res.status(404).json({ error: 'Nenhum banner encontrado' });
            }

            return res.json(banner);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro banner' });
        }
    }
}

export default BannerController;