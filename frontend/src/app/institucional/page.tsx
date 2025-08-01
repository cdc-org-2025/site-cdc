"use client"
import Footer from '@/components/molecules/Footer'
import InstitucionalPage from '@/features/institucional'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function Institucional() {
  const { data } = useBannerQuery("institucional")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <GoogleAnalytics />
      <HeaderBannerUnique Banner={Banner} />
      <InstitucionalPage />
      <Footer />
    </>
  )
}
