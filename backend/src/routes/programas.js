
import { Router } from "express";
import ProgramasController from "../controllers/ProgramasController.js";

const router = Router();

router.get("/", ProgramasController.index);
router.get("/:id", ProgramasController.show);
router.post("/", ProgramasController.store);
router.put("/:id", ProgramasController.update);
router.delete("/:id", ProgramasController.destroy);

export default router;
