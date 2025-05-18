
import { Router } from "express";
import TransparenciaController from "../controllers/TransparenciaController.js";

const router = Router();

router.get("/", TransparenciaController.index);
router.get("/:id", TransparenciaController.show);

export default router;
