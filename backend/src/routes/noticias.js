
import { Router } from "express";
import NoticiasController from "../controllers/NoticiasController.js";

const router = Router();

router.get("/", NoticiasController.index);
router.get("/:id", NoticiasController.show);
// router.get("/show-news", NoticiasController.showNews)

export default router;
