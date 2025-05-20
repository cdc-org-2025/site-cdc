'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import AnimetedSlide from '@/components/animations/slide'
import AnimationSplitText from '@/components/animations/splitText'
import { ITransparencia, useListTransparenciaQuery } from '@/clients/api/transparencia'
import { useTheme } from '@mui/material'

export default function Transparency() {
  const { data: listTransparencia } = useListTransparenciaQuery()
  const { palette: { primary: { main } } } = useTheme()

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" pb="24px" id="transparent">
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

      <Grid container spacing={4} pb="64px">
        {listTransparencia?.data?.map((item: ITransparencia) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <AnimetedSlide>
              <Box
                component={'a'}
                sx={{
                  cursor: 'pointer', '&:hover': {
                    span: {
                      color: `${main} !important`
                    }
                  }
                }}
                href={item.documento_url}
                target='_blank'
              >
                <CardTagDesc
                  info={{
                    id: item.id,
                    areas: item.areas,
                    description: item.titulo,
                    image: item.url_imagem
                  }}
                  personal
                />
              </Box>
            </AnimetedSlide>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
