import { Router } from "express";
import ContatoFormController from "../controllers/ContatoFormController.js";
// import cors from 'cors';

const router = Router();

// const corsOptions = {
//   origin: '*', // Substitua por um domínio específico em produção!
//   methods: ['POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// // ✅ Responde ao preflight (OPTIONS) com CORS permitido
// router.options('/', cors(corsOptions));

// ✅ Rota principal POST
// router.post('/', cors(corsOptions), ContatoFormController.index);
router.post('/', ContatoFormController.index);


export default router;
