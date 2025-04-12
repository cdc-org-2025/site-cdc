'use client'
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import MenuAreasWithSearchInput from '@/components/molecules/MenuAreaWithSearchInput'
import ListCards from '@/components/molecules/ListCards'

const areasDisponiveis = [
  ['PPCAM', 'Diretoria Institucional'],
  ['Conselho Fiscal', 'PROVITA'],
  ['MAIS VIDA', 'PPVIDA', 'PPDPI'],
  ['ATM', 'Programa ATITUDE'],
]

export default function Publicacoes() {
  const [fieldSearch, setFieldSearch] = useState('')
  const [areaSelect, setAreaSelect] = useState<string[]>([])

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
          Publicações
        </Typography>
      </Box>
      <Box display="flex" gap="24px" alignItems={'center'}>
        <MenuAreasWithSearchInput
          valueInput={fieldSearch}
          setValueInput={setFieldSearch}
          areaSelect={areaSelect}
          setAreaSelect={setAreaSelect}
          listAreasAvailable={areasDisponiveis}
        />
      </Box>
      <ListCards />
    </Box>
  )
}
