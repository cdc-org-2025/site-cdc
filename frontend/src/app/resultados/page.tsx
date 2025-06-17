import { Suspense } from 'react'
import ResultadosPage from './resultadosPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResultadosPage />
    </Suspense>
  )
}
