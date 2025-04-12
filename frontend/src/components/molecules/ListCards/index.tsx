import Grid from '@mui/material/Grid'
import React from 'react'
import LastNewsDefault from '../../../assets/pages/home-page/last-news-default.svg'
import CardTagDesc from '@/components/atoms/CardTagDesc'

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
  {
    id: 4,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
  },
  {
    id: 5,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
  },
]

export default function ListCards() {
  return (
    <Grid container spacing={4}>
      {lastNewsList.map((news) => (
        <Grid key={news.id} item xs={12} md={4} lg={3} xl={3}>
          <CardTagDesc info={news} />
        </Grid>
      ))}
    </Grid>
  )
}
