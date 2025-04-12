
import { Router } from "express";
import OportunidadesController from "../controllers/OportunidadesController.js";

const router = Router();

router.get("/", OportunidadesController.index);
router.get("/:id", OportunidadesController.show);
router.post("/", OportunidadesController.store);
router.put("/:id", OportunidadesController.update);
router.delete("/:id", OportunidadesController.destroy);

export default router;
