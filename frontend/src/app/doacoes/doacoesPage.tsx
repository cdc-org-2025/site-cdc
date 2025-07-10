"use client"
import { useBannerQuery } from '@/clients/api/banners'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { storageUrl } from '@/constants/storageDomain'
import Doacoes from '@/features/doacoes'

export default function DoacoesPage() {
  const { data } = useBannerQuery("doacao")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <Doacoes />
      <Footer />
    </>
  )
}
