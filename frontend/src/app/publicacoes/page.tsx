"use client"
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import Publicacoes from '@/features/publicacoes'
import { useBannerQuery } from '@/clients/api/banners'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import { storageUrl } from '@/constants/storageDomain'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function PublicacoesPage() {
  const { data } = useBannerQuery("publicacoes")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <GoogleAnalytics />
      <HeaderBannerUnique noneMobile Banner={Banner} />
      <Publicacoes />
      <Footer />
    </>
  )
}
