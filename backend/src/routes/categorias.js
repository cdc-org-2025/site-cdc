
import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";

const router = Router();

router.get("/", CategoriasController.index);
router.get("/:id", CategoriasController.show);
router.post("/", CategoriasController.store);
router.put("/:id", CategoriasController.update);
router.delete("/:id", CategoriasController.destroy);

export default router;
