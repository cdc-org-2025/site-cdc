'use client'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { useParams } from 'next/navigation'
import { Box } from '@mui/material'
import { sanitizeHtml } from '@/utils/stripHtmlTags'
import { useProgramaQuery } from '@/clients/api/programas'

export default function ProgramaUniquePage() {
  const { id } = useParams()
  const { data } = useProgramaQuery(id)

  const Banner = {
    id: 1,
    title: `${data?.titulo} -`,
    image: data?.url_image_capa,
    highlight: data?.subtitulo
  }

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      {data?.conteudo && (
        <Box width={'100%'} display='flex' justifyContent={'center'}>
          <Box width={'100%'} maxWidth={'800px'} p='16px'>
            <Box
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(data.conteudo),
              }}
            />
          </Box>
        </Box>
      )}
      <Footer />
    </>
  )
}
