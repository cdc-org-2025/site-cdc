'use client'
import Image from 'next/image'
import LogoCDC from '../../../assets/logo_cdc.png'
import ButtonAction from '@/components/atoms/ButtonAction'
import ButtonSearch from '@/components/atoms/ButtonSearch'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import NavbarDesktop from '../Navbar/desktop'
import NavbarMobile from '../Navbar/mobile'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation'
import { useMenuOptions } from '@/hooks/useMenuOption'
import { useMediaQuery, useTheme } from '@mui/material'

export default function Header() {
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false)
  const { push } = useRouter()
  const menuWithProgramas = useMenuOptions()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Box height="94px" width="100%" maxWidth="100vw" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={{ xs: "16px ", md: "16px 32px" }}
        height="94px"
        position="fixed"
        top={0}
        left={0}
        maxWidth="100vw"
        width="100%"
        zIndex={9}
        bgcolor={'primary.light'}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={isMobile ? "20px" : "56px"}
        >
          <Image
            priority
            height={isMobile ? 44 : 62}
            src={LogoCDC}
            alt="Logo Centro de Desenvolvimento Social"
          />
          <NavbarDesktop menuOption={menuWithProgramas} />
        </Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
          display={{
            xs: 'none',
            lg: 'flex',
          }}
        >
          <Button
            variant="contained"
            onClick={() => push('/doacoes')}
            sx={{
              width: 140,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#FE9A03',
              '&:hover': {
                backgroundColor: '#cb7a01',
              },
            }}
          >
            <Typography color='#222' fontWeight={400} textTransform="none" sx={{ marginRight: -1 }}>Doe agora</Typography>
            <ArrowForwardIosIcon htmlColor='#222' sx={{ height: 17, marginRight: -2 }} />
          </Button>
          <ButtonSearch />
        </Box>
        <Box
          gap={{
            xs: '10px',
            lg: '30px',
          }}
          display={{
            xs: 'flex',
            lg: 'none',
          }}
          alignItems="center"
        >
          <Button
            variant="text"
            onClick={() => push('/doacoes')}
            sx={{
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography whiteSpace={'nowrap'} color='#A7181D' fontWeight={400} textTransform="none" >Doe agora</Typography>
          </Button>
          <Box
            width={{ xs: '110px', md: '140px' }}
          >
            <ButtonAction
              startIcon={
                openMenuMobile ? <CloseIcon color="inherit" /> : <MenuIcon />
              }
              onClick={() => setOpenMenuMobile((prev) => !prev)}
            >
              Menu
            </ButtonAction>
          </Box>
          {openMenuMobile && <NavbarMobile menuOptions={menuWithProgramas} setOpen={setOpenMenuMobile} />}
        </Box>
      </Box>
    </>
  )
}
