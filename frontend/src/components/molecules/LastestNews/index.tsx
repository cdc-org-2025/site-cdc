'use client'
import ButtonAction from '@/components/atoms/ButtonAction'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import AnimationSplitText from '@/components/animations/splitText'
import Grid from '@mui/material/Grid'
import { useNoticiasListQuery } from '@/clients/api/noticias'
import { useRouter } from 'next/navigation'

export default function LatestNews() {
  const { data } = useNoticiasListQuery()
  const dataset = data?.slice(0, 3)
  const { push } = useRouter()

  return (
    <Box px={{ xs: '16px', md: '32px' }} mt="64px" pb="40px" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="24px"
      >
        <AnimationSplitText>
          <Typography
            variant={"h3"}
            fontSize={{ xs: '35px', md: '1.94rem' }}
            color="primary"
            textTransform="none"
            whiteSpace={'nowrap'}
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
      <Grid container spacing={{ xs: '35px', md: 4 }}>
        {dataset?.map((news) => (
          <Grid item key={news.id} xs={12} sm={4} md={4}>
            <CardTagDesc info={news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
