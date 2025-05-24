'use client'
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import MenuAreasWithSearchInput from '@/components/molecules/MenuAreaWithSearchInput'
import ListCards from '@/components/molecules/ListCards'
import { useScrollToTop } from '@/hooks/useScroll'
import { IPublicacao, usePublicacoesQuery } from '@/clients/api/publicacoes'

export default function Publicacoes() {
  useScrollToTop()
  const [fieldSearch, setFieldSearch] = useState('')
  const [areaSelect, setAreaSelect] = useState<string[]>([])
  const { data } = usePublicacoesQuery()
  const [listPublicacoes, setListPublicacoes] = useState<IPublicacao[]>([])
  const [areasFiltro, setAreasFiltro] = useState<{ id: number, nome: string }[]>([])

  const onSearch = () => {
    if (fieldSearch !== "") {
      const listFilter = listPublicacoes.filter(item => item.titulo?.toLocaleLowerCase()?.includes(fieldSearch.toLocaleLowerCase()))
      setListPublicacoes(listFilter)
    } else {
      if (data) {
        setListPublicacoes(data?.data)
      } else {
        setListPublicacoes([])
      }
    }
  }

  useEffect(() => {
    if (data?.data && areaSelect.length > 0) {
      const filtradas = data.data.filter((publicacao: IPublicacao) =>
        publicacao?.areas?.some(area => areaSelect.includes(area.nome))
      )
      setListPublicacoes(filtradas)
    } else if (data?.data) {
      setListPublicacoes(data.data)
    }
  }, [areaSelect, data])

  useEffect(() => {
    if (data) {
      setListPublicacoes(data?.data)
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
      width={"100%"}
      maxWidth={"100vw"}
    >
      <Box display={{ xs: 'flex', sm: 'none' }} pb="32px">
        <Typography variant="h3" color="primary" >
          Publicações
        </Typography>
      </Box>
      <Box display="flex" gap="24px" alignItems={'center'}
        width={"100%"}
        maxWidth={"100vw"}>
        <MenuAreasWithSearchInput
          valueInput={fieldSearch}
          setValueInput={setFieldSearch}
          areaSelect={areaSelect}
          setAreaSelect={setAreaSelect}
          listAreasAvailable={areasFiltro}
          onSearch={onSearch}
        />
      </Box>
      <ListCards list={listPublicacoes} page='/publicacoes' />
    </Box>
  )
}
