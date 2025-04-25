'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import MenuAreas from './MenuAreas'
import LastNewsDefault from '../../../assets/pages/home-page/last-news-default.svg'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'

const lastNewsList = [
  {
    id: 1,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
    occupation: 'ocuppation teste',
    email: 'email teste',
  },
  {
    id: 2,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
    occupation: 'ocuppation teste',
    email: 'email teste',
  },
  {
    id: 3,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
    occupation: 'ocuppation teste',
    email: 'email teste',
  },
  {
    id: 4,
    tag: 'Direito da Pessoa Idosa',
    description: 'Estatuto do Centro de Desenvolvimento e Cidadania (CDC)',
    image: LastNewsDefault,
    occupation: 'ocuppation teste',
    email: 'email teste',
  },
]

const areasDisponiveis = [
  ['PPCAM', 'Diretoria Institucional'],
  ['Conselho Fiscal', 'PROVITA'],
  ['MAIS VIDA', 'PPVIDA', 'PPDPI'],
  ['ATM', 'Programa ATITUDE'],
]

export default function Leadership() {
  const [areaSelect, setAreaSelect] = useState<string[]>([])

  const handleAreaSelect = useCallback((newAreaList: string[]) => {
    setAreaSelect(newAreaList)
  }, [])

  const filteredList = useMemo(() => {
    return lastNewsList
  }, [areaSelect])

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" id="leadership">
        <AnimationSplitText>
          <Typography variant="h3" color="primary" width="100%">
            Lideranças
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
            O CDC é liderado por pessoas referência no campo dos direitos
            humanos, garantindo a cidadania e transformação social.
          </Typography>
        </AnimationSplitText>
      </Box>

      <MenuAreas
        areaSelect={areaSelect}
        setAreaSelect={handleAreaSelect}
        listAreasAvailable={areasDisponiveis}
      />

      <Grid container spacing={4} pb="64px">
        {filteredList.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <AnimetedSlide>
              <CardTagDesc
                info={{
                  id: item.id,
                  tag: item.tag,
                  description: item.description,
                  image: item.image,
                  occupation: item.occupation,
                  email: item.email,
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
