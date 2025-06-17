"use client"
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import Noticias from '@/features/noticias'
import { useBannerQuery } from '@/clients/api/banners'
import { storageUrl } from '@/constants/storageDomain'
import { TypeBannerUnique } from '@/components/atoms/Banner/unique'
import { sanitizeHtml } from '@/utils/stripHtmlTags'

export default function NoticiasPage() {
  const { data } = useBannerQuery("noticias")

  const Banner: TypeBannerUnique = {
    id: data?.[0]?.id,
    title: data?.[0]?.titulo ? sanitizeHtml(data?.[0]?.titulo) : "Sem título",
    image: `${storageUrl}/${data?.[0].url_img}`,
  }

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      <Noticias />
      <Footer />
    </>
  )
}
