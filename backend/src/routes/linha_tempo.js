
import { Router } from "express";
import LinhaTempoController from "../controllers/LinhaDoTempoController.js";


const router = Router();

router.get("/", LinhaTempoController.index);

export default router;
