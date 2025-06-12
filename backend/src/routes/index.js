
import { Router } from "express";
import express from 'express';
import multer from 'multer'; 

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
import cardsInformativosRoutes from "./card_informativo.js";
import candidaturaVagaForm from './candidaturaVagaForm.js'
import indicadoresRoutes from "./indicadores.js";
import contatoForm from './contatoForm.js'
import organizacao from './organizacao.js'
import banners from './banners.js'
import conteudoSecao from './conteudo_secao.js'
import search from './search.js'

const router = Router();

router.use("/noticias", noticiasRoutes);
router.use("/categorias", categoriasRoutes);
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
router.use("/perguntas-frenquente", perguntasFrenquenteRoutes);
router.use("/cards-informativos", cardsInformativosRoutes);
router.use('/candidatura',  candidaturaVagaForm);
router.use('/indicadores', indicadoresRoutes)
router.use('/contato', contatoForm)
router.use("/organizacao", organizacao )
router.use("/banner", banners)
router.use("/conteudo-secao", conteudoSecao),
router.use("/pesquisa", search)


export default router;
