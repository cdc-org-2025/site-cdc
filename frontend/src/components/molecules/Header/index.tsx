'use client'
import Image from 'next/image'
import LogoCDC from '../../../assets/logo_cdc.svg'
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
import { useNavigation } from '@/hooks/useNavigation'

export default function Header() {
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false)
  const { handleNavigate } = useNavigation()

  return (
    <>
      <Box height="94px" width="100%" />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="16px 32px"
        height="94px"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        zIndex={9}
        bgcolor={'primary.light'}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="56px"
        >
          <Image
            priority
            height={62}
            src={LogoCDC}
            alt="Logo Centro de Desenvolvimento Social"
          />
          <NavbarDesktop />
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
          <Button variant="text" onClick={() => handleNavigate('/doacoes')}>
            <Typography textTransform="none">Doe agora</Typography>
          </Button>
          <ButtonSearch />
        </Box>
        <Box
          display={{
            xs: 'block',
            lg: 'none',
          }}
        >
          <ButtonAction
            startIcon={
              openMenuMobile ? <CloseIcon color="inherit" /> : <MenuIcon />
            }
            onClick={() => setOpenMenuMobile((prev) => !prev)}
          >
            Menu
          </ButtonAction>
          {openMenuMobile && <NavbarMobile setOpen={setOpenMenuMobile} />}
        </Box>
      </Box>
    </>
  )
}
