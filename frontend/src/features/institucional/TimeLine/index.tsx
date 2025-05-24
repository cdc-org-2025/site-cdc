'use client'
import React from 'react'
import ImagesRounded from '@/components/atoms/ImagesRounded'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Circle from '@/components/atoms/Circle'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'
import AnimatedFade from '@/components/animations/fade'
import { ILinhaTempo, useTimeLineQuery } from '@/clients/api/linha-tempo'
import { sanitizeHtml } from '@/utils/stripHtmlTags'
import { isStorage } from '@/helpers/isStorage'

export default function Timeline() {
  const {
    palette: {
      secondary: { light },
    },
  } = useTheme()
  const { data } = useTimeLineQuery()

  return data?.map((item: ILinhaTempo, index: number) => (
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
            {item.titulo}
          </Typography>
        </AnimationSplitText>
        <AnimationSplitText>
          <Typography
            variant="overline"
            textTransform="none"
            color="text.primary"
            lineHeight="150%"
          >
            {item.conteudo && sanitizeHtml(item?.conteudo)}
          </Typography>
        </AnimationSplitText>

        <Box display="flex" flexDirection="column" gap="24px" width="100%">
          {item.imagens[0] && (
            <AnimetedSlide>
              <Box width="100%" height="172px">
                <ImagesRounded url={isStorage(item.imagens[0])} />
              </Box>
            </AnimetedSlide>
          )}
          {item.imagens[1] && (
            <AnimetedSlide>
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                gap="24px"
                height="172px"
              >
                <ImagesRounded url={isStorage(item.imagens[1])} />
                <ImagesRounded url={isStorage(item.imagens[2])} />
              </Box>
            </AnimetedSlide>
          )}
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
              {item.ano}
            </Typography>
          </Circle>
        </AnimatedFade>

        <Box
          width="1.35px"
          height="100%"
          bgcolor={data.length === index + 1 ? 'transparent' : light}
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
