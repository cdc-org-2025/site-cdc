'use client'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { useParams } from 'next/navigation'
import { useNoticiaQuery } from '@/clients/api/noticias'
import { Box } from '@mui/material'
import { stripHtmlTags } from '@/utils/stripHtmlTags'

export default function NoticiasUniquePage() {
  const { id } = useParams()
  const { data } = useNoticiaQuery(id)

  const Banner = {
    id: 1,
    title: data?.titulo,
    image: data?.imagem_capa,
  }

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      {data?.html_original && (
        <Box width={'100%'} display='flex' justifyContent={'center'}>
          <Box width={'100%'} maxWidth={'800px'} p='16px'>
            {stripHtmlTags(data.html_original)}
          </Box>
        </Box>
      )}
      <Footer />
    </>
  )
}
