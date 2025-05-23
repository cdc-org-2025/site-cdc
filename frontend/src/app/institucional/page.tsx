import type { Metadata } from 'next'
import Footer from '@/components/molecules/Footer'
import InstitucionalPage from '@/features/institucional'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import PPDI from '../../assets/banner/ppdi.svg'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'

export const metadata: Metadata = {
  title: 'CDC - Institucional',
  description:
    'É uma Organização da Sociedade Civil, sem fins lucrativos, com atuação em âmbito local e nacional. Tem como missão contribuir para a transformação social na promoção da cidadania, por meio de atividades formativas, articulação, incidência em políticas públicas e assessoria técnica, tendo suas ações voltadas à promoção de atividades de relevância pública e social que fortaleçam a democracia e beneficiem a humanidade.',
  authors: {
    name: 'Renato Albuquerque',
    url: 'https://www.linkedin.com/in/renato-albuquerque-dev/',
  },
}

export default function Institucional() {
  const Banner: TypeBannerUnique = {
    id: 1,
    title: 'O Centro de Desenvolvimento e Cidadania é uma OSC dedicada à',
    highlight: "transformação social",
    image: PPDI,
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <InstitucionalPage />
      <Footer />
    </>
  )
}
