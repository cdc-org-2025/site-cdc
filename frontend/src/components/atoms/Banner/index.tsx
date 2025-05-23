'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PPDI from '../../../assets/banner/ppdi.svg'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ButtonAction from '../ButtonAction'
import CircleIcon from '@mui/icons-material/Circle'
import BackDefault from '../../../assets/accordion-projects/default.svg'
import { useRouter } from 'next/navigation'
import { storageUrl } from '@/constants/storageDomain'

export default function Banner() {
  const { push } = useRouter()
  const {
    palette: { secondary },
  } = useTheme()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [resetTimer, setResetTimer] = useState<boolean>(false)

  const BannerOption = [
    {
      id: 1,
      title:
        'Programa de Promoção dos Direitos da Pessoa Idosa (PPDI) realiza a III Jornada de Direitos Humanos em ILPIs',
      image: PPDI,
      link: '/',
    },
    {
      id: 2,
      title: 'O Centro de Desenvolvimento e Cidadania é uma OSC dedicada à',
      highlight: 'transformação social',
      image: BackDefault,
      link: '/',
    },
    {
      id: 3,
      title: 'Programa de Promoção dos Direitos da Pessoa Idosa -',
      highlight: 'PPDPI',
      image: PPDI,
      link: '/',
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? BannerOption.length - 1 : prevIndex - 1
    )
    setResetTimer((prev) => !prev)
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BannerOption.length)
    setResetTimer((prev) => !prev)
  }, [BannerOption.length])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setResetTimer((prev) => !prev)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [handleNext, resetTimer])

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
      <Box
        display="flex"
        width={`${BannerOption.length * 100}vw`}
        height="100%"
        sx={{
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
      >
        {BannerOption.map((banner) => (
          <Box
            key={banner.id}
            width="100vw"
            height="100%"
            sx={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url("${!banner?.image?.src ? `${storageUrl}/${banner?.image}` : banner?.image?.src}")
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Box
              display={{ xs: 'none', lg: 'flex' }}
              alignItems="center"
              justifyContent="center"
              height="100%"
              paddingX="30px"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#0000008d',
                },
              }}
              onClick={handlePrev}
            >
              <ArrowBackIosNewIcon fontSize="large" htmlColor="#F6F6F699" />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              pl={{ xs: '16px', sm: '50px' }}
              mb="80px"
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
                {banner.title}
                {banner.highlight && (
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
                    {banner.highlight}
                  </Typography>
                )}
              </Typography>
              <Box>
                <ButtonAction
                  onClick={() => push(banner.link)}
                  endIcon={
                    <ArrowForwardIosIcon
                      sx={{ height: '14px', width: '20px' }}
                    />
                  }
                >
                  Leia mais
                </ButtonAction>
              </Box>
            </Box>

            <Box
              display={{ xs: 'none', lg: 'flex' }}
              alignItems="center"
              justifyContent="center"
              height="100%"
              paddingX="30px"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#0000008d',
                },
              }}
              onClick={handleNext}
            >
              <ArrowForwardIosIcon fontSize="large" htmlColor="#F6F6F699" />
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        position="absolute"
        bottom={20}
        left="50%"
        sx={{ display: 'flex', gap: '8px', transform: 'translateX(-50%)' }}
      >
        {BannerOption.map((_, index) => (
          <CircleIcon
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              width: '10px',
              color: index === currentIndex ? secondary.light : '#ccc',
              transition: 'color 0.3s ease-in-out',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
