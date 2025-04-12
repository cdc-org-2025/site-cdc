import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import GoogleLogo from '../../../assets/partners/googleplus-logo.svg'
import MicrosoftLogo from '../../../assets/partners/microsoft-logo.svg'
import MetalLBLogo from '../../../assets/partners/metallb-logo.svg'
import LinkedinLogo from '../../../assets/partners/linkedin-logo.svg'
import ScrollInfiniteHorizontal from '@/components/animations/scrollInfinite/horizontal'

const listPartners = [
  {
    id: 0,
    image: GoogleLogo.src,
    altImage: 'GoogleLogo',
  },
  {
    id: 1,
    image: MicrosoftLogo.src,
    altImage: 'MicrosoftLogo',
  },
  {
    id: 2,
    image: MetalLBLogo.src,
    altImage: 'MetalLBLogo',
  },
  {
    id: 3,
    image: LinkedinLogo.src,
    altImage: 'LinkedinLogo',
  },
]

export default function Partners() {
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
        items={listPartners}
        itemWidth={210}
        itemHeight={52}
      />
    </Box>
  )
}
