// routes/contato.js
import { Router } from "express";
import ContatoFormController from "../controllers/ContatoFormController.js";
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/', upload.none(), ContatoFormController.index);

export default router;
