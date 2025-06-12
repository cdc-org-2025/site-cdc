import { Suspense } from 'react'
import PublicacoesPage from '../publicacoes/page'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PublicacoesPage />
    </Suspense>
  )
}
