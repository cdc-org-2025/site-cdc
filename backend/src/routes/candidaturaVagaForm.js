
import { Router } from "express";
import multer from 'multer';
import CandidaturaVagaFormController from "../controllers/CandidaturaVagaFormController.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('anexo'), CandidaturaVagaFormController.index);

export default router;
