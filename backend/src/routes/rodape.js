import { Router } from "express";
import RodapeController from "../controllers/RodapeController.js";

const router = Router();

router.get("/", RodapeController.index);

export default router;
