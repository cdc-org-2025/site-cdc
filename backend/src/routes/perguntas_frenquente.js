
import { Router } from "express";
import PerguntasFrenquenteController from "../controllers/PerguntasFrenquenteController.js";

const router = Router();

router.get("/", PerguntasFrenquenteController.index);

export default router;
