
import { Router } from "express";
import LiderancaController from "../controllers/LiderancaController.js";

const router = Router();

router.get("/", LiderancaController.index);
router.get("/:id", LiderancaController.show);

export default router;
