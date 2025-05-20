'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardTagDesc from '@/components/atoms/CardTagDesc'
import MenuAreas from './MenuAreas'
import AnimationSplitText from '@/components/animations/splitText'
import AnimetedSlide from '@/components/animations/slide'
import { IArea, useAreasQuery } from '@/clients/api/areas'
import { ILideranca, useLiderancasListQuery } from '@/clients/api/liderancas'

export default function Leadership() {
  const { data: dataAreas } = useAreasQuery()
  const { data: dataLiderancas } = useLiderancasListQuery()
  const [listColaboradores, setListColaboradores] = useState<ILideranca[] | undefined>([])
  const [areaSelect, setAreaSelect] = useState<IArea[]>([])

  useEffect(() => {
    if (dataLiderancas?.data) {
      setListColaboradores(dataLiderancas?.data)
    }
  }, [dataLiderancas?.data])

  const handleAreaSelect = useCallback((newAreaList: IArea[]) => {
    setAreaSelect(newAreaList)

    if (!newAreaList.length) {
      setListColaboradores(dataLiderancas?.data)
      return
    }

    const selectedIds = newAreaList.map(area => Number(area.id))

    const filtered = dataLiderancas?.data?.filter(lideranca =>
      lideranca.areas?.some(area => selectedIds.includes(Number(area.id)))
    )

    setListColaboradores(filtered)
  }, [dataLiderancas])

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
        liderancas={true}
        areaSelect={areaSelect}
        setAreaSelect={handleAreaSelect}
        listAreasAvailable={dataAreas}
      />

      <Grid container spacing={4} pb="64px">
        {listColaboradores?.map((item: ILideranca) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <AnimetedSlide>
              <CardTagDesc
                info={{
                  id: item.id,
                  areas: item.areas,
                  description: item.nome,
                  image: item.url_imagem,
                  occupation: item.cargo,
                  email: item.email,
                }}
                leadership
              />
            </AnimetedSlide>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
