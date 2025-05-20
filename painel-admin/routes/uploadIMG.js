import express from 'express';
import multer from 'multer';
import path from 'path';
import { GCPProvider } from '../config/GCPProvider.js';
import fs from 'fs'

const router = express.Router();
const upload = multer({ dest: 'tmp/' }); // uploads temporários no disco
const gcpProvider = new GCPProvider();

router.post('/admin/upload-editor-image', upload.single('file'), async (req, res) => {
  const file = req.file;
  const folder = req.body.folder || 'editor';
  const filename = `${Date.now()}-${file.originalname}`;
  const key = path.posix.join(folder, filename);

  try {
    await gcpProvider.upload(file, key);
    const publicUrl = gcpProvider.path(key);

    // remove o arquivo temporário
    fs.unlink(file.path, () => {});

    res.json({ url: publicUrl });
  } catch (error) {
    console.error('❌ Erro ao enviar imagem para o GCP:', error);
    res.status(500).json({ error: 'Erro ao enviar imagem' });
  }
});

export default router;
