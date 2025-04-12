import type { Metadata } from 'next'
import HomePage from '@/features/home'
import HeaderBanner from '@/components/templates/HeaderBanner'
import Footer from '@/components/molecules/Footer'

export const metadata: Metadata = {
  title: 'Centro de Desenvolvimento e Cidadania',
  description:
    'É uma Organização da Sociedade Civil, sem fins lucrativos, com atuação em âmbito local e nacional. Tem como missão contribuir para a transformação social na promoção da cidadania, por meio de atividades formativas, articulação, incidência em políticas públicas e assessoria técnica, tendo suas ações voltadas à promoção de atividades de relevância pública e social que fortaleçam a democracia e beneficiem a humanidade.',
  authors: {
    name: 'Renato Albuquerque',
    url: 'https://www.linkedin.com/in/renato-albuquerque-dev/',
  },
}

export default function Home() {
  return (
    <>
      <HeaderBanner />
      <HomePage />
      <Footer />
    </>
  )
}
