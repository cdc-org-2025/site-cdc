'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import MenuAreasWithSearchInput from '@/components/molecules/MenuAreaWithSearchInput'
import ListCards from '@/components/molecules/ListCards'
import { useScrollToTop } from '@/hooks/useScroll'
import ZoomOutOnView from '@/components/animations/zoomOutOnView'
import { IPrograma, useProgramasListQuery } from '@/clients/api/programas'

export default function Programas() {
  useScrollToTop()
  const [fieldSearch, setFieldSearch] = useState('')
  const [areaSelect, setAreaSelect] = useState<string[]>([])
  const { data } = useProgramasListQuery()
  const [listProgramas, setListProgramas] = useState<IPrograma[]>([])
  const [areasFiltro, setAreasFiltro] = useState<{ id: number, nome: string }[]>([])

  const onSearch = () => {
    if (fieldSearch !== "") {
      const listFilter = listProgramas.filter(item => item.titulo?.toLocaleLowerCase()?.includes(fieldSearch.toLocaleLowerCase()))
      setListProgramas(listFilter)
    } else {
      if (data) {
        setListProgramas(data?.data)
      } else {
        setListProgramas([])
      }
    }
  }

  useEffect(() => {
    if (data?.data && areaSelect.length > 0) {
      const filtradas = data.data.filter((programa: IPrograma) =>
        programa.areas?.some(area => areaSelect.includes(area.nome))
      )
      setListProgramas(filtradas)
    } else if (data?.data) {
      setListProgramas(data.data)
    }
  }, [areaSelect, data])

  useEffect(() => {
    if (data) {
      setListProgramas(data?.data)
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
      overflow={"hidden"} width={"100%"} maxWidth={"100vw"}
    >
      <ZoomOutOnView>
        <Box display={{ xs: 'flex', sm: 'none' }} pb="32px">
          <Typography variant="h3" color="primary">
            Programas
          </Typography>
        </Box>
        <Box display="flex" gap="24px" alignItems={'center'}>
          <MenuAreasWithSearchInput
            valueInput={fieldSearch}
            setValueInput={setFieldSearch}
            areaSelect={areaSelect}
            setAreaSelect={setAreaSelect}
            listAreasAvailable={areasFiltro}
            onSearch={onSearch}
          />
        </Box>
      </ZoomOutOnView>
      <ListCards page="/programas" list={listProgramas} />
    </Box>
  )
}
