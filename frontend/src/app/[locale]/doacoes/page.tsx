import type { Metadata } from 'next'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import PPDI from '../../../assets/banner/ppdi.svg'
import Doacoes from '@/features/doacoes'

export const metadata: Metadata = {
  title: 'CDC - Doações',
  description:
    'É uma Organização da Sociedade Civil, sem fins lucrativos, com atuação em âmbito local e nacional. Tem como missão contribuir para a transformação social na promoção da cidadania, por meio de atividades formativas, articulação, incidência em políticas públicas e assessoria técnica, tendo suas ações voltadas à promoção de atividades de relevância pública e social que fortaleçam a democracia e beneficiem a humanidade.',
  authors: {
    name: 'Renato Albuquerque',
    url: 'https://www.linkedin.com/in/renato-albuquerque-dev/',
  },
}

export default function DoacoesPage() {
  const Banner = {
    id: 1,
    title: 'Seu apoio é fundamental para manter o',
    highlight: 'CDC ativo e lutando pela democracia.',
    image: PPDI,
  }
  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <Doacoes />
      <Footer />
    </>
  )
}
