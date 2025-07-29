"use client"
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import TrabalheConoscoPage from '@/features/trabalhe-conosco'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function TrabalheConosco() {
  const { data } = useBannerQuery("trabalhe_conosco")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo,
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <GoogleAnalytics />
      <HeaderBannerUnique Banner={Banner} />
      <TrabalheConoscoPage />
      <Footer />
    </>
  )
}
