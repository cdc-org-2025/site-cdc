
import { Router } from "express";
import ContatoController from "../controllers/ContatoController.js";

const router = Router();

router.get("/", ContatoController.index);
router.get("/:id", ContatoController.show);
router.post("/", ContatoController.store);
router.put("/:id", ContatoController.update);
router.delete("/:id", ContatoController.destroy);

export default router;
