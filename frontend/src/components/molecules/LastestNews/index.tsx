'use client'
import ButtonAction from '@/components/atoms/ButtonAction'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import LastNewsDefault from '../../../assets/pages/home-page/last-news-default.svg'
import AnimationSplitText from '@/components/animations/splitText'
import Grid from '@mui/material/Grid'

const lastNewsList = [
  {
    id: 1,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
  },
  {
    id: 2,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
  },
  {
    id: 3,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
  },
]

export default function LatestNews() {
  return (
    <Box px={{ xs: '16px', md: '32px' }} mt="64px" pb="40px" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="24px"
      >
        <AnimationSplitText>
          <Typography variant="h3" color="primary" textTransform="none">
            Últimas notícias
          </Typography>
        </AnimationSplitText>
        <Box width="185px" height="44px">
          <ButtonAction onClick={() => console.log('possivel navegação')}>
            Ver mais
          </ButtonAction>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {lastNewsList.map((news) => (
          <Grid item key={news.id} xs={12} md={4}>
            <CardTagDesc info={news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
