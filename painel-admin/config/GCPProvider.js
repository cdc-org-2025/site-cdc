import { Storage } from '@google-cloud/storage'
import fs from 'fs'
import path from 'path'
import { BaseProvider } from '@adminjs/upload'

const storage = new Storage({
  keyFilename: path.join(process.cwd(), 'config/chave.json'), // ajuste conforme o caminho real do seu JSON
})

const bucket = storage.bucket('cdc-site')

export class GCPProvider extends BaseProvider {
  constructor() {
    super('')
  }

  async upload(file, key) {
    console.log('📤 Upload para GCP:', key)

    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(bucket.file(key).createWriteStream({
          metadata: {
            contentType: file.type,
            cacheControl: 'public, max-age=31536000',
          },
        }))
        .on('error', (err) => {
          console.error('❌ Erro ao subir para GCP:', err)
          reject(err)
        })
        .on('finish', () => {
          console.log('✅ Upload finalizado com sucesso')
          resolve()
        })
    })
  }

  async delete(key) {
    console.log('🗑️ Removendo arquivo do GCP:', key)
    try {
      await bucket.file(key).delete()
    } catch (err) {
      console.warn('⚠️ Erro ao deletar (talvez o arquivo não exista):', err.message)
    }
  }

  path(key) {
    return `https://storage.googleapis.com/cdc-site/${key}`
  }
}
