import uploadFeature from '@adminjs/upload'
import { componentLoader } from '../src/components.js'

export const uploadImageFeature = uploadFeature({
  componentLoader,
  provider: {
    gcp: {
      bucket: 'cdc-site',       // seu bucket GCS
      expires: 0                // URL pública permanente
    }
  },
  properties: {
    key: 'url_imagem',
    file: 'uploadImagem'
  },
  validation: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    maxSize: 5 * 1024 * 1024
  },
  uploadPath: (record, filename) => {
    const id = record?.id?.() || `temp-${Date.now()}`
    const clean = filename.replace(/\s+/g, '_')
    const fullPath = `colaboradores/${id}-${clean}`
    console.log('📤 Enviando para GCP em:', fullPath)
    return fullPath
  }
})
