
import { Router } from "express";
import InscricoesOportunidadesController from "../controllers/InscricoesOportunidadesController.js";

const router = Router();

router.get("/", InscricoesOportunidadesController.index);
router.get("/:id", InscricoesOportunidadesController.show);
router.post("/", InscricoesOportunidadesController.store);
router.put("/:id", InscricoesOportunidadesController.update);
router.delete("/:id", InscricoesOportunidadesController.destroy);

export default router;
