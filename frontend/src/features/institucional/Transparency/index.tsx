import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import LastNewsDefault from '../../../assets/pages/home-page/last-news-default.svg'
import AnimetedSlide from '@/components/animations/slide'
import AnimationSplitText from '@/components/animations/splitText'

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
]

export default function Transparency() {
  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" pb="24px" id='transparent'>
        <AnimationSplitText>
          <Typography variant="h3" color="primary" width="100%">
            Transparência
          </Typography>
        </AnimationSplitText>
        <AnimationSplitText>
          <Typography
            variant="overline"
            textTransform="none"
            color="text.primary"
            lineHeight="150%"
            maxWidth="600px"
          >
            O CDC conta com um time especializado para garantir o sucesso das
            ações e efetivar transformações sociais significativas.
          </Typography>
        </AnimationSplitText>
      </Box>
      <Grid container spacing={4} pb={'64px'}>
        {lastNewsList.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <AnimetedSlide>
              <CardTagDesc
                info={{
                  id: 0,
                  tag: item.tag,
                  description: item.description,
                  image: item.image,
                }}
                personal
              />
            </AnimetedSlide>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
