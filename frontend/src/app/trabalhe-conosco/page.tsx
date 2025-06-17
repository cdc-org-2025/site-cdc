"use client"
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import TrabalheConoscoPage from '@/features/trabalhe-conosco'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import { sanitizeHtml } from '@/utils/stripHtmlTags'

export default function TrabalheConosco() {
  const { data } = useBannerQuery("trabalhe_conosco")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo ? sanitizeHtml(data?.[0]?.titulo) : 'Sem título',
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <TrabalheConoscoPage />
      <Footer />
    </>
  )
}
