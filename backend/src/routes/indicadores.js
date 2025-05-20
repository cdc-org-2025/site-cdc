
import { Router } from "express";
import IndicadoresController from "../controllers/IndicadoresController.js";

const router = Router();

router.get("/", IndicadoresController.index);
router.get("/:id", IndicadoresController.show);

export default router;
