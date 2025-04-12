import React from 'react'
import Header from '../molecules/Header'
import Box from '@mui/material/Box'
import Banner from '../atoms/Banner'
import AnimetedSlide from '../animations/slide'

export default function HeaderBanner() {
  return (
    <>
      <Header />
      <AnimetedSlide distance={700}>
        <Box
          sx={{
            height: 'calc(100vh - 94px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Banner />
        </Box>
      </AnimetedSlide>
    </>
  )
}
