
import { Router } from "express";

import noticiasRoutes from "./noticias.js";
import categoriasRoutes from "./categorias.js";
import contatoRoutes from "./contato.js";
import colaboradoresRoutes from "./colaboradores.js";
import programasRoutes from "./programas.js";
import oportunidadesRoutes from "./oportunidades.js";
import inscricoesRoutes from "./inscricoes_oportunidades.js";
import areasRoutes from "./areas.js";
import transparenciaRoutes from "./transparencia.js";
import publicacaoRoutes from "./publicacao.js";

const router = Router();

router.use("/noticias", noticiasRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/contato", contatoRoutes);
router.use("/colaboradores", colaboradoresRoutes);
router.use("/programas", programasRoutes);
router.use("/oportunidades", oportunidadesRoutes);
router.use("/inscricoes", inscricoesRoutes);
router.use("/areas", areasRoutes);
router.use("/transparencia", transparenciaRoutes);
router.use("/publicacoes", publicacaoRoutes);

export default router;
