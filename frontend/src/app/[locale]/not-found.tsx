'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Header from '@/components/molecules/Header'
import Footer from '@/components/molecules/Footer'
import { useNavigation } from '@/hooks/useNavigation'

export default function NotFound() {
  const { handleNavigate } = useNavigation()

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box
        flex="1"
        width="100%"
        minHeight={'492px'}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={'center'}
        gap="16px"
        bgcolor={'#f3f2ed'}
      >
        <Typography variant="h3" lineHeight={'120%'} textAlign={'center'}>
          Eita, página não encontrada!
        </Typography>
        <Typography
          maxWidth="400px"
          lineHeight="150%"
          textAlign="center"
          variant="overline"
          textTransform={'none'}
        >
          Sentimos muito, mas essa página não existe.{' '}
          <Typography
            onClick={() => handleNavigate('/')}
            color="primary"
            lineHeight="150%"
            component={'a'}
            variant="overline"
            textTransform={'none'}
            sx={{ cursor: 'pointer' }}
          >
            Retorne para o início
          </Typography>{' '}
          ou{' '}
          <Typography
            onClick={() => handleNavigate('/contato')}
            color="primary"
            lineHeight="150%"
            component={'a'}
            variant="overline"
            textTransform={'none'}
            sx={{ cursor: 'pointer' }}
          >
            entre em contato
          </Typography>{' '}
          conosco!
        </Typography>
      </Box>
      <Footer />
    </Box>
  )
}
