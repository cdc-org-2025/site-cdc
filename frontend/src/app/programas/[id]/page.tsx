'use client'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import { sanitizeHtml } from '@/utils/stripHtmlTags'
import { useProgramaQuery } from '@/clients/api/programas'
import LatestNews from '@/components/molecules/LastestNews'
import Transparency from '@/features/institucional/Transparency'
import Faq from '@/features/institucional/Faq'
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

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
            {data.descricao ? (
              <Box
                sx={{
                  fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
                }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(data.descricao),
                }}
              />
            ) : (
              <>Sem descrição disponivel</>
            )}
          </Box>
        </Box>
      )}
      <LatestNews programa />
      <Box px={{ xs: '16px', md: '32px' }} mt="64px" pb={{ xs: '80px', md: '160px' }} width="100%">
        <Transparency />
        <Faq />
      </Box>
      <Footer />
    </>
  )
}
