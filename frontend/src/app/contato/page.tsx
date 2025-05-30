"use client"
import Footer from '@/components/molecules/Footer'
import ContatoPage from '@/features/contato'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'

export default function Contato() {
  const { data } = useBannerQuery("contato")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo ?? 'Contato',
    highlight: data?.[0]?.subtitulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <ContatoPage />
      <Footer />
    </>
  )
}
