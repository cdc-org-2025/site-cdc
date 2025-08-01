import { Suspense } from 'react'
import ResultadosPage from './resultadosPage'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
      <ResultadosPage />
    </Suspense>
  )
}
