
import { Router } from "express";
import TransparenciaController from "../controllers/TransparenciaController.js";

const router = Router();

router.get("/", TransparenciaController.index);
router.get("/:id", TransparenciaController.show);
router.post("/", TransparenciaController.store);
router.put("/:id", TransparenciaController.update);
router.delete("/:id", TransparenciaController.destroy);

export default router;
