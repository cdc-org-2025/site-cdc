
import { Router } from "express";
import ConteudoSecaoController from "../controllers/ConteudoSecaoController.js";

const router = Router();

router.get("/", ConteudoSecaoController.index);

export default router;
