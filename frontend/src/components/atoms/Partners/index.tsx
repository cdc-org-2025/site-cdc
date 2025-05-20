"use client"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import ScrollInfiniteHorizontal from '@/components/animations/scrollInfinite/horizontal'
import { useParceirosQuery } from '@/clients/api/parceiros'

export default function Partners() {
  const { data } = useParceirosQuery()

  return (
    <Box
      display="flex"
      gap="48px"
      flexDirection="column"
      px="16px"
      alignItems="center"
      mb="80px"
      mt="48px"
    >
      <Typography
        variant="h3"
        textTransform="none"
        color="primary"
        textAlign="center"
      >
        Parceiros que confiam no nosso trabalho
      </Typography>
      <ScrollInfiniteHorizontal
        items={data}
        itemWidth={210}
        itemHeight={100}
      />
    </Box>
  )
}
