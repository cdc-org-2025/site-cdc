
import { Router } from "express";
import ProgramasController from "../controllers/ProgramasController.js";

const router = Router();

router.get("/", ProgramasController.index);
router.get("/:id", ProgramasController.show);

export default router;
