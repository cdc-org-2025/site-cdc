
import { Router } from "express";

import noticiasRoutes from "./noticias.js";
import categoriasRoutes from "./categorias.js";
import contatoRoutes from "./contato.js";
import liderancaRoutes from "./lideranca.js";
import programasRoutes from "./programas.js";
import oportunidadesRoutes from "./oportunidades.js";
import inscricoesRoutes from "./inscricoes_oportunidades.js";
import areasRoutes from "./areas.js";
import transparenciaRoutes from "./transparencia.js";
import publicacaoRoutes from "./publicacao.js";
import dadosBancarioRoutes from "./dados_bancario.js";
import linhaTempoRoutes from "./linha_tempo.js";
import parceirosRoutes from "./parceiros.js";
import perguntasFrenquenteRoutes from "./perguntas_frenquente.js";

const router = Router();

router.use("/noticias", noticiasRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/contato", contatoRoutes);
router.use("/liderancas", liderancaRoutes);
router.use("/programas", programasRoutes);
router.use("/oportunidades", oportunidadesRoutes);
router.use("/inscricoes", inscricoesRoutes);
router.use("/areas", areasRoutes);
router.use("/transparencia", transparenciaRoutes);
router.use("/publicacoes", publicacaoRoutes);
router.use("/dados-bancario", dadosBancarioRoutes);
router.use("/linha-tempo", linhaTempoRoutes);
router.use("/parceiros", parceirosRoutes);
router.use("/perguntas-frenquente", perguntasFrenquenteRoutes)


export default router;
