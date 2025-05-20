'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import MenuAreasWithSearchInput from '@/components/molecules/MenuAreaWithSearchInput'
import ListCards from '@/components/molecules/ListCards'
import { useScrollToTop } from '@/hooks/useScroll'
import { INoticias, useNoticiasListQuery } from '@/clients/api/noticias'

export default function Noticias() {
  useScrollToTop()
  const [fieldSearch, setFieldSearch] = useState('')
  const [areaSelect, setAreaSelect] = useState<string[]>([])
  const { data } = useNoticiasListQuery()
  const [listNoticias, setListNoticias] = useState<INoticias[]>([])
  const [areasFiltro, setAreasFiltro] = useState<{ id: number, nome: string }[]>([])

  useEffect(() => {
    if (data?.data && areaSelect.length > 0) {
      const filtradas = data.data.filter((noticia: INoticias) =>
        noticia.areas?.some(area => areaSelect.includes(area.nome))
      )
      setListNoticias(filtradas)
    } else if (data?.data) {
      setListNoticias(data.data)
    }
  }, [areaSelect, data])

  useEffect(() => {
    if (data) {
      setListNoticias(data?.data)
      setAreasFiltro(data?.areas_filtro)
    }
  }, [data])

  return (
    <Box
      p={{ xs: '32px 16px 32px 16px', md: '40px 32px 160px 32px' }}
      display="flex"
      flexDirection="column"
      gap={{ xs: '32px', md: '24px' }}
      bgcolor="background.default"
    >
      <Box display={{ xs: 'flex', sm: 'none' }}>
        <Typography variant="h3" color="primary">
          Notícias
        </Typography>
      </Box>
      <Box display="flex" gap="24px" alignItems={'center'}>
        <MenuAreasWithSearchInput
          valueInput={fieldSearch}
          setValueInput={setFieldSearch}
          areaSelect={areaSelect}
          setAreaSelect={setAreaSelect}
          listAreasAvailable={areasFiltro}
        />
      </Box>
      <ListCards page="/noticias" list={listNoticias} />
    </Box>
  )
}
