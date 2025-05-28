"use client"
import Footer from '@/components/molecules/Footer'
import InstitucionalPage from '@/features/institucional'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'

export default function Institucional() {
  const { data } = useBannerQuery("institucional")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo ?? 'O Centro de Desenvolvimento e Cidadania é uma OSpC dedicada à',
    highlight: data?.[0]?.subtitulo ?? "transformação social",
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <InstitucionalPage />
      <Footer />
    </>
  )
}
