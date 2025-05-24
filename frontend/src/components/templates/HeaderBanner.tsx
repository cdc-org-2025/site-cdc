"use client"
import React from 'react'
import Header from '../molecules/Header'
import Box from '@mui/material/Box'
import Banner from '../atoms/Banner'
import AnimetedSlide from '../animations/slide'
import { useNoticiasListQuery } from '@/clients/api/noticias'
import CircularProgress from '@mui/material/CircularProgress';

export default function HeaderBanner() {
  const { data, isLoading } = useNoticiasListQuery()

  return (
    <>
      <Header />
      {isLoading ? (
        <Box
          sx={{
            height: 'calc(100vh - 94px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <AnimetedSlide distance={500} threshold={0.1}>
          <Box
            sx={{
              height: 'calc(100vh - 94px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Banner data={data} />
          </Box>
        </AnimetedSlide>
      )}

    </>
  )
}
