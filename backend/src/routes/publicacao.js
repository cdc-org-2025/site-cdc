
import { Router } from "express";
import PublicacaoController from "../controllers/PublicacaoController.js";

const router = Router();

router.get("/", PublicacaoController.index);
router.get("/:id", PublicacaoController.show);

export default router;
