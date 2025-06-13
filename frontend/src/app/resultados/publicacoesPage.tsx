'use client'

import { getPesquisasList, IPesquisa, usePesquisaQuery } from '@/clients/api/pesquisa'
import ZoomOutOnView from '@/components/animations/zoomOutOnView'
import Footer from '@/components/molecules/Footer'
import ListCards from '@/components/molecules/ListCards'
import MenuAreasWithSearchInput from '@/components/molecules/MenuAreaWithSearchInput'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import Box from '@mui/material/Box'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PublicacoesPage() {
  const Banner = {
    id: 1,
    title: 'Resultados',
    image: '/ppdi.svg',
  }

  const searchParams = useSearchParams()
  const termoDePesquisa = searchParams.get('pesquisa')
  const { data } = usePesquisaQuery(termoDePesquisa)
  const [fieldSearch, setFieldSearch] = useState('')
  const [areaSelect, setAreaSelect] = useState<string[]>([])
  const [listPesquisas, setListPesquisas] = useState<IPesquisa[]>([])
  const [areasFiltro, setAreasFiltro] = useState<{ id: number, nome: string }[]>([])

  const onSearch = async () => {
    if (fieldSearch !== '') {
      const { data, areas_filtro } = await getPesquisasList(fieldSearch.toLowerCase())
      setListPesquisas(data)
      setAreasFiltro(areas_filtro)
    }
  }

  useEffect(() => {
    if (data?.data && areaSelect.length > 0) {
      const filtradas = data.data.filter((noticia: IPesquisa) =>
        noticia.areas?.some(area => areaSelect.includes(area.nome))
      )
      setListPesquisas(filtradas)
    } else if (data?.data) {
      setListPesquisas(data.data)
    }
  }, [areaSelect, data])

  useEffect(() => {
    if (data) {
      setListPesquisas(data.data)
      setAreasFiltro(data.areas_filtro)
    }
  }, [data])

  return (
    <>
      <HeaderBannerUnique noneMobile Banner={Banner} />
      <Box
        p={{ xs: '32px 16px 32px 16px', md: '40px 32px 160px 32px' }}
        display="flex"
        flexDirection="column"
        gap={{ xs: '32px', md: '24px' }}
        bgcolor="background.default"
        overflow="hidden"
        width="100%"
        maxWidth="100vw"
      >
        <ZoomOutOnView>
          <Box display="flex" gap="24px" alignItems="center">
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
        <ListCards page="/resultados" list={listPesquisas} />
      </Box>
      <Footer />
    </>
  )
}
