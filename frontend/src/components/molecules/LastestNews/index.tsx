'use client'
import ButtonAction from '@/components/atoms/ButtonAction'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import AnimationSplitText from '@/components/animations/splitText'
import Grid from '@mui/material/Grid'
import { INoticias } from '@/clients/api/noticias'
import { useRouter } from 'next/navigation'
import ZoomOutOnView from '@/components/animations/zoomOutOnView'
import VectorRoundedLines from '@/components/atoms/VectorRoundedLines'

export default function LatestNews({ programa, listNoticia }: { programa?: boolean, listNoticia?: INoticias[] }) {
  const { push } = useRouter()

  return (
    <Box px={{ xs: '16px', md: '32px' }} mt="64px" pb="40px" width="100%" maxWidth={"100vw"} >
      {programa && (
        <VectorRoundedLines right={0} rotate margin="60px 0px 0px 0px" />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="24px"
      >
        <AnimationSplitText initialFontWeight={700}>
          <Typography
            variant="h3"
            fontSize={{ xs: '28px', md: '1.94rem' }}
            color="primary"
            textTransform="none"
          >
            Últimas notícias
          </Typography>
        </AnimationSplitText>

        <Box width={{ xs: '110px', md: '185px' }} height="44px">
          <ButtonAction onClick={() => push('/noticias')}>
            Ver mais
          </ButtonAction>
        </Box>
      </Box>
      {programa && (
        <Box mt="-20px" pb="10px">
          <Typography variant='overline' fontWeight={400} textTransform={"none"} color={"text.primary"}>
            Confira as últimas notícias relacionadas ao programa.
          </Typography>
        </Box>
      )}
      <Box overflow={"hidden"} width={"100%"} maxWidth={"100vw"}>
        <ZoomOutOnView delay={200} scaleFrom={1.3}>
          <Grid container spacing={{ xs: '35px', md: 4 }} >
            {listNoticia?.slice(0, 3)?.map((news: INoticias) => (
              <Grid item key={news.id} xs={12} sm={4} md={4}>
                <CardTagDesc
                  info={news}
                  onclick={() => push(`/noticias/${news.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </ZoomOutOnView>
      </Box>
    </Box>
  )
}
