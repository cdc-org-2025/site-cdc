'use client'
import Footer from '@/components/molecules/Footer'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import { useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import { sanitizeHtml } from '@/utils/stripHtmlTags'
import { useProgramaQuery } from '@/clients/api/programas'
import LatestNews from '@/components/molecules/LastestNews'
import Transparency from '@/features/institucional/Transparency'
import { Lato } from 'next/font/google'
import { storageUrl } from '@/constants/storageDomain'
import Typography from '@mui/material/Typography'
import { useTransparenciaAreaQuery } from '@/clients/api/transparencia'
import { useNoticiasAreaQuery } from '@/clients/api/noticias'

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

export default function ProgramaUniquePage() {
  const { id } = useParams()
  const { data } = useProgramaQuery(id)
  const idsArea = data?.areas?.map((item) => item.id).join(',');
  const { data: listTransparencia } = useTransparenciaAreaQuery({ area_id: idsArea })
  const { data: listNoticias } = useNoticiasAreaQuery({ area_id: idsArea })

  const Banner = {
    id: 1,
    title: `${data?.titulo} -`,
    image: `${storageUrl}/${data?.url_image_capa}`,
    highlight: data?.subtitulo
  }

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      <Box width={'100%'} display='flex' justifyContent={'center'}>
        <Box width={'100%'} maxWidth={'800px'} p='16px'>
          {data?.descricao ? (
            <Box
              sx={{
                fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(data.descricao),
              }}
            />
          ) : (
            <Typography variant='h1' color={"primary"} textAlign={"center"}>Sem descrição disponivel</Typography>
          )}
        </Box>
      </Box>
      <Box px={{ xs: '16px', md: '32px' }} mt="64px" pb={{ xs: '80px', md: '160px' }} width="100%" maxWidth={"100vw"}>
        <LatestNews listNoticia={listNoticias?.data} programa />
        <Transparency listTransparencia={listTransparencia} />
      </Box>
      <Footer />
    </>
  )
}
