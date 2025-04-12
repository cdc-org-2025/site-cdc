
import { Router } from "express";
import PublicacaoController from "../controllers/PublicacaoController.js";

const router = Router();

router.get("/", PublicacaoController.index);
router.get("/:id", PublicacaoController.show);
router.post("/", PublicacaoController.store);
router.put("/:id", PublicacaoController.update);
router.delete("/:id", PublicacaoController.destroy);

export default router;
