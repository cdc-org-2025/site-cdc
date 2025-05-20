import { Router } from "express";
import ContatoFormController from "../controllers/ContatoFormController.js";

const router = Router();

router.post('/', ContatoFormController.index);

export default router;
