import RootLayout from './RootLayout'
import ButtonAccessible from '@/components/atoms/ButtonAccessible'
import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Centro de Desenvolvimento e Cidadania',
  description:
    'É uma Organização da Sociedade Civil, sem fins lucrativos, com atuação em âmbito local e nacional. Tem como missão contribuir para a transformação social na promoção da cidadania, por meio de atividades formativas, articulação, incidência em políticas públicas e assessoria técnica, tendo suas ações voltadas à promoção de atividades de relevância pública e social que fortaleçam a democracia e beneficiem a humanidade.',
  authors: {
    name: 'Renato Albuquerque',
    url: 'https://www.linkedin.com/in/renato-albuquerque-dev/',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function LocalePageLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <RootLayout  >
      {children}
      <ToastContainer
        theme="colored"
        className="custom-toast"
      />
      <ButtonAccessible />
    </RootLayout>
  )
}
