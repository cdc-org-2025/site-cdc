import { Suspense } from 'react'
import DoacoesPage from './doacoesPage'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function Page() {

  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
      <DoacoesPage />
    </Suspense>
  )
}
