"use client"
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Frame1 from '../../assets/pages/home-page/1-3_1frame100.svg'
import Frame2 from '../../assets/pages/home-page/1-3_2frame50.svg'
import Frame3 from '../../assets/pages/home-page/1-3_3frame50.svg'
import ImagesRounded from '@/components/atoms/ImagesRounded'
import OrganicShapeScircle from '../../assets/background-elements/organic-shape-circle.svg'
import VectorRoundedLines from '../../assets/background-elements/vector-rounded-lines.svg'
import CardInformation from '@/components/molecules/CardInformation'
import MissionImage from '../../assets/cards-information/mission.svg'
import VisionImage from '../../assets/cards-information/vision.svg'
import AccordionProjects from '@/components/molecules/AccordionProjects'
import Partners from '@/components/atoms/Partners'
import LatestNews from '@/components/molecules/LastestNews'
import FormContactMap from '@/components/templates/FormContactMap'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'
import { useCardsInformativosListQuery } from '@/clients/api/cards-informativos'
import { storageUrl } from '@/constants/storageDomain'
import Indicadores from './Indicadores'

export default function HomePage() {
  const { data: cardOption } = useCardsInformativosListQuery()
  const cardVisao = cardOption?.find(item => item.titulo === "Visão")
  const cardMissao = cardOption?.find(item => item.titulo === "Missão")

  const cardOptions = [
    {
      image: cardMissao?.url_imagem ? `${storageUrl}/${cardMissao?.url_imagem}` : MissionImage,
      title: cardMissao?.titulo,
      description: cardMissao?.descricao
    },
    {
      image: cardVisao?.url_imagem ? `${storageUrl}/${cardVisao?.url_imagem}` : VisionImage,
      title: cardVisao?.titulo,
      description: cardVisao?.descricao
    },
  ]

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent="space-between"
        gap={{
          xs: '56px',
          lg: '20px',
        }}
        padding={{
          xs: '32px 16px ',
          lg: '32px',
        }}
        position="relative"
        mt="48px"
      >
        <Box
          width={{
            xs: '100%',
            md: '50%',
          }}
        >
          <AnimationSplitText>
            <Typography variant="h3" color="primary" pb="16px">
              Uma organização pernambucana na luta pela transformação social
            </Typography>
          </AnimationSplitText>
          <AnimationSplitText>
            <Typography
              color="text.primary"
              textTransform="none"
              variant="overline"
              lineHeight="150%"
            >
              O Centro de Desenvolvimento e Cidadania é uma organização não
              governamental que luta pela transformação social por meio de
              atividades formativas, articulação, incidência em políticas
              públicas e assessoria técnica. Fundada no 2000, a instituição
              consolidou sua atuação no propósito de democratizar o acesso à
              tecnologia de informação entre jovens e adultos, estimulando a
              democracia e a participação cidadã no processo de construção de
              uma sociedade de oportunidades para todos.
            </Typography>
          </AnimationSplitText>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="24px"
          width={{
            xs: '100%',
            md: '50%',
          }}
        >
          <AnimetedSlide distance={100} tension={10} friction={5}>
            <Box width="100%" height="172px">
              <ImagesRounded url={Frame1} />
            </Box>
          </AnimetedSlide>
          <AnimetedSlide distance={100} tension={10} friction={5}>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              gap="24px"
              height="172px"
            >
              <ImagesRounded url={Frame2} />
              <ImagesRounded url={Frame3} />
            </Box>
          </AnimetedSlide>
        </Box>
        <Box
          position="absolute"
          right={0}
          zIndex={-1}
          mr="40px"
          display={{
            xs: 'none',
            md: 'block',
          }}
        >
          <Image src={OrganicShapeScircle} alt="organic shape" />
        </Box>
        <Box
          position="absolute"
          left={0}
          bottom={0}
          mb={-30}
          zIndex={-1}
          display={{
            xs: 'none',
            md: 'block',
          }}
        >
          <Image src={VectorRoundedLines} alt="vector rounded lines" />
        </Box>
      </Box>
      <Box
        pt={{ xs: '40px', md: '80px' }}
        pb="40px"
        flexDirection={{ xs: 'column', md: 'row' }}
        display="flex"
        justifyContent="space-between"
        gap="24px"
        px={{ xs: '16px', md: '24px' }}
      >
        {cardOptions.map((item) => (
          <Box width={{ xs: '100%', md: '50%' }} key={item.title}>
            <AnimetedSlide distance={100} tension={10} friction={5}>
              <CardInformation item={item} />
            </AnimetedSlide>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        px={{ xs: '16px', md: '32px' }}
        gap="16px"
        pb="24px"
        mt="48px"
        alignItems="center"
      >
        <AnimationSplitText>
          <Typography
            variant="h3"
            color="primary"
            textAlign="center"
            lineHeight="120%"
          >
            Na luta para o fortalecimento democrático e cidadão pela redução das
            desigualdades.
          </Typography>
        </AnimationSplitText>
        <AnimationSplitText>
          <Typography
            variant="overline"
            color="text.primary"
            textTransform="none"
            lineHeight="150%"
            textAlign="center"
          >
            Atuamos por meio de programas para desenvolver ações para
            fortalecimento cidadão na luta pela redução das desigualdades.
          </Typography>
        </AnimationSplitText>
      </Box>
      <AccordionProjects />
      <Partners />
      <Indicadores />
      <LatestNews />
      <FormContactMap />
    </>
  )
}
