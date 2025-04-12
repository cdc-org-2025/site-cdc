
import { Router } from "express";
import ColaboradoresController from "../controllers/ColaboradoresController.js";

const router = Router();

router.get("/", ColaboradoresController.index);
router.get("/:id", ColaboradoresController.show);
router.post("/", ColaboradoresController.store);
router.put("/:id", ColaboradoresController.update);
router.delete("/:id", ColaboradoresController.destroy);

export default router;
