
import { Router } from "express";
import multer from 'multer';
import CandidaturaVagaFormController from "../controllers/CandidaturaVagaFormController.js";

const router = Router();
const upload = multer({
    dest: 'uploads/', // ou onde preferir armazenar
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword', // .doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // aceita o arquivo
        } else {
            cb(new Error('Apenas arquivos PDF ou Word são permitidos.'));
        }
    }
});

router.post('/', upload.single('anexo'), CandidaturaVagaFormController.index);

export default router;
