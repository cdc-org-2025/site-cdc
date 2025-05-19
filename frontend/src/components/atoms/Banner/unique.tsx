'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface IBannerUnique {
  Banner: TypeBannerUnique
}

export interface TypeBannerUnique {
  id: number
  title?: string
  image: any
  highlight?: string
}

export default function BannerUnique({ Banner }: IBannerUnique) {
  return (
    <Box
      width="100vw"
      height="100%"
      sx={{
        backgroundColor: '#f3f2ed',
        borderRadius: '0 0 16px 16px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box display="flex" width={`100vw`} height="100%">
        <Box
          key={Banner.id}
          width="100vw"
          height="100%"
          sx={{
            backgroundImage: `url(${Banner.image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexShrink: 0,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="24px"
            pl={{ xs: '16px', sm: '32px' }}
            mt="130px"
            alignItems="flex-start"
            width="100%"
          >
            <Typography
              maxWidth="790px"
              lineHeight="120%"
              variant="h2"
              sx={{
                fontSize: {
                  sm: '2.67rem',
                },
              }}
              color={'primary.light'}
            >
              {Banner.title}
              {Banner.highlight && (
                <Typography
                  variant="h2"
                  color="secondary.light"
                  sx={{
                    fontSize: {
                      sm: '2.67rem',
                    },
                  }}
                  component="span"
                >
                  {' '}
                  {Banner.highlight}
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
