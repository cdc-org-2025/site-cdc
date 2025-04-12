'use client'
import React from 'react'
import Frame1 from '../../../assets/pages/home-page/1-3_1frame100.svg'
import Frame2 from '../../../assets/pages/home-page/1-3_2frame50.svg'
import Frame3 from '../../../assets/pages/home-page/1-3_3frame50.svg'
import ImagesRounded from '@/components/atoms/ImagesRounded'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Circle from '@/components/atoms/Circle'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'
import AnimatedFade from '@/components/animations/fade'

export interface ITimelineOption {
  id: number
  year: string
  title: string
  description: string
  image1: { src: string }
  image2: { src: string }
  image3: { src: string }
}

export default function Timeline() {
  const timelineOptions = [
    {
      id: 0,
      year: '2000',
      title: 'Surgimento do CDC',
      description:
        'Fundada em 2000 como Centro de Luta e Incentivo à Cidadania (CLIC), a instituição buscou democratizar o acesso à tecnologia, promovendo a participação cidadã e a construção de uma sociedade mais inclusiva.',
      image1: Frame1,
      image2: Frame2,
      image3: Frame3,
    },
    {
      id: 1,
      year: '2010',
      title: 'Crescimento',
      description:
        'Fundada em 2000 como Centro de Luta e Incentivo à Cidadania (CLIC), a instituição buscou democratizar o acesso à tecnologia, promovendo a participação cidadã e a construção de uma sociedade mais inclusiva.',
      image1: Frame1,
      image2: Frame2,
      image3: Frame3,
    },
    {
      id: 2,
      year: '2020',
      title: 'Auge',
      description:
        'Fundada em 2000 como Centro de Luta e Incentivo à Cidadania (CLIC), a instituição buscou democratizar o acesso à tecnologia, promovendo a participação cidadã e a construção de uma sociedade mais inclusiva.',
      image1: Frame1,
      image2: Frame2,
      image3: Frame3,
    },
  ]
  const {
    palette: {
      secondary: { light },
    },
  } = useTheme()
  return timelineOptions.map((item: ITimelineOption, index: number) => (
    <Box
      display="flex"
      width="100%"
      gap={{ xs: '24px', lg: '32px' }}
      justifyContent="space-between"
      key={item.id}
      flexDirection={{
        xs: 'row-reverse',
        lg: index % 2 ? 'row-reverse' : 'row',
      }}
      id='timeline'
    >
      <Box
        width={{ xs: '100%', lg: '45%' }}
        display="flex"
        flexDirection="column"
        gap="16px"
        pb={{ xs: '32px', lg: '0px' }}
      >
        <AnimationSplitText>
          <Typography variant="h5" color="text.primary">
            {item.title}
          </Typography>
        </AnimationSplitText>
        <AnimationSplitText>
          <Typography
            variant="overline"
            textTransform="none"
            color="text.primary"
            lineHeight="150%"
          >
            {item.description}
          </Typography>
        </AnimationSplitText>

        <Box display="flex" flexDirection="column" gap="24px" width="100%">
          <AnimetedSlide>
            <Box width="100%" height="172px">
              <ImagesRounded url={item.image1} />
            </Box>
          </AnimetedSlide>
          <AnimetedSlide>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              gap="24px"
              height="172px"
            >
              <ImagesRounded url={item.image2} />
              <ImagesRounded url={item.image3} />
            </Box>
          </AnimetedSlide>
        </Box>
      </Box>
      <Box
        width={{ xs: '140px', lg: '10%' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <AnimatedFade duration={1000} easing="ease-out" initialOpacity={0}>
          <Circle color={light}>
            <Typography variant="h5" color="text.primary" fontWeight={400}>
              {item.year}
            </Typography>
          </Circle>
        </AnimatedFade>

        <Box
          width="1.35px"
          height="100%"
          bgcolor={timelineOptions.length === index + 1 ? 'transparent' : light}
        />
      </Box>
      <Box
        display={{ xs: 'none', lg: 'block' }}
        width="45%"
        height="100%"
        bgcolor="red"
      />
    </Box>
  ))
}
