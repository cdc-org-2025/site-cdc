'use client'
import FormContactMap from '@/components/templates/FormContactMap'
import { useScrollToTop } from '@/hooks/useScroll'
import Box from '@mui/material/Box'
import React from 'react'

export default function ContatoPage() {
  useScrollToTop()

  return (
    <Box width="100%" mt="40px" mb={{ xs: '0px', lg: '200px' }}>
      <FormContactMap />
    </Box>
  )
}
