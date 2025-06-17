import { Suspense } from 'react'
import DoacoesPage from './doacoesPage'

export default function Page() {

  return (
    <Suspense fallback={null}>
      <DoacoesPage />
    </Suspense>
  )
}
