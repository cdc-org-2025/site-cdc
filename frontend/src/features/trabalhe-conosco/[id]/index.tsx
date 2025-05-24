'use client'
import HeaderBannerUnique from '@/components/templates/HeaderBannerUnique'
import React from 'react'
import { useParams } from 'next/navigation'
import VacancyDescription from './vacancyDescription'
import Box from '@mui/material/Box'
import FormEnrollment from './formEnrollment'
import { useOportunidadeQuery } from '@/clients/api/oportunidades'
import VectorRoundedLines from '@/components/atoms/VectorRoundedLines'

export default function TrabalheConoscoVagaPage() {
  const { id } = useParams()
  const { data } = useOportunidadeQuery(id)

  const Banner = {
    id: Number(id),
    title: data?.titulo,
    image: '/ppdi.svg',
  }

  return (
    <>
      <HeaderBannerUnique Banner={Banner} />
      <Box
        width="100%"
        px="16px"
        pt={{ lg: '60px', md: '40px', xs: '16px' }}
        display="flex"
        flexDirection={'column'}
        alignItems="center"
      >
        <VectorRoundedLines left={0} margin='10% 0 0 0' />
        <Box maxWidth="802px">
          <VacancyDescription
            description={data?.descricao}
          />
          <FormEnrollment tituloVaga={data?.titulo} />
        </Box>
      </Box>
    </>
  )
}
