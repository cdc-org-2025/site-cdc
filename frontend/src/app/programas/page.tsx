"use client"
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import Programas from '@/features/programas'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'

export default function ProgramasPage() {
  const { data } = useBannerQuery("programas")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo ?? 'Programas',
    highlight: data?.[0]?.subtitulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      <Programas />
      <Footer />
    </>
  )
}
