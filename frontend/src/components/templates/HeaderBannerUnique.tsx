import React from 'react'
import Header from '../molecules/Header'
import Box from '@mui/material/Box'
import AnimetedSlide from '../animations/slide'
import BannerUnique, { TypeBannerUnique } from '../atoms/Banner/unique'

interface IHeaderBannerUnique {
  Banner: TypeBannerUnique
  noneMobile?: boolean
}

export default function HeaderBannerUnique({
  Banner,
  noneMobile = false,
}: IHeaderBannerUnique) {
  return (
    <>
      <Header />
      <AnimetedSlide distance={500} threshold={0.1}>
        <Box
          display={{ xs: noneMobile ? 'none' : 'flex', sm: 'flex' }}
          sx={{
            height: 'calc(100vh - 94px)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BannerUnique Banner={Banner} />
        </Box>
      </AnimetedSlide>
    </>
  )
}
