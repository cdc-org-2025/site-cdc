import { Router } from "express";
import ContatoFormController from "../controllers/ContatoFormController.js";
import cors from 'cors';

const router = Router();

// Configuração CORS específica para esta rota
const corsOptions = {
  origin: '*', // ou '*' para liberar tudo
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Aplica o middleware cors APENAS nesta rota POST
router.post('/', cors(corsOptions), ContatoFormController.index);

export default router;
