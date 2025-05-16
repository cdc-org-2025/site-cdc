
import { Router } from "express";
import DadosBancarioController from "../controllers/dadosBancarioController.js";

const router = Router();

router.get("/", DadosBancarioController.index);

export default router;
