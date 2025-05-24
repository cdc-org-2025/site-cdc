'use client'
import { ISubMenu } from '@/constants/menuNavigation'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import FacebookLogo from '../../../assets/icons-socialmedia/facebook-logo.svg'
import InstagramLogo from '../../../assets/icons-socialmedia/instagram-logo.svg'
import LinkedinLogo from '../../../assets/icons-socialmedia/linkedin-logo.svg'
import Image from 'next/image'
import { useNavigation } from '@/hooks/useNavigation'
import { useMenuOptions } from '@/hooks/useMenuOption'
import { useRouter } from 'next/navigation'
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  const { handleSubMenuClick } = useNavigation()
  const menuWithProgramas = useMenuOptions()
  const { push } = useRouter()

  return (
    <Box
      bgcolor="background.paper"
      component="footer"
      p={{ xs: '44px 0px 44px 30px', md: '44px 32px' }}
      width="100%"
      display="flex"
      gap="40px"
      flexDirection={{ xs: 'column', md: 'row' }}
    >
      <Box display="flex" flexDirection="column" gap="16px" maxWidth={{ xs: '100%', md: '290px' }}>
        <Typography
          variant="body2"
          color="text.primary"
        >
          Centro de Desenvolvimento e Cidadania - CDC
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
        >
          Rua Bispo Cardoso Ayres, 440 - Santo Amaro, Recife - PE, 50050-135
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
        >
          CNPJ 03.970.166/0001-29
        </Typography>
      </Box>
      <Box
        display="flex"
        gap="40px"
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        {menuWithProgramas?.slice(1)?.map((menu) => (
          <Box key={menu.id} display="flex" flexDirection="column" gap="16px" maxWidth={{ xs: '100%', md: '290px' }}>
            <Typography
              variant="body2"
              onClick={() => menu.link && push(menu.link)}
              sx={{ cursor: 'pointer' }}
              fontWeight={700}
              color="text.primary"
            >
              {menu.label}
            </Typography>
            {menu.subMenus?.map((subMenu: ISubMenu) => (
              <Typography
                onClick={() => handleSubMenuClick(subMenu, menu.label)}
                sx={{ cursor: 'pointer' }}
                variant="body2"
                key={subMenu.id}
                color="text.primary"
                component="a"
              >
                {subMenu.label}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>

      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="16px"
      >
        <Typography variant="body2" color="text.primary" fontWeight={700}>
          Redes sociais
        </Typography>
        <Box display="flex" gap="24px">
          <a href="https://web.facebook.com/cdc.osc/" target="_blank" rel="noopener noreferrer">
            <Image priority src={FacebookLogo} alt="FacebookLogo" />
          </a>
          <a href="https://www.youtube.com/@cdc_osc" target="_blank" rel="noopener noreferrer">
            <Box mt="-5px"><YouTubeIcon color='primary' /></Box>
          </a>
          <a href="https://www.instagram.com/cdc_osc/" target="_blank" rel="noopener noreferrer">
            <Image priority src={InstagramLogo} alt="InstagramLogo" />
          </a>
          <a href="https://www.linkedin.com/company/centro-de-desenvolvimento-e-cidadania/" target="_blank" rel="noopener noreferrer">
            <Image priority src={LinkedinLogo} alt="LinkedinLogo" />
          </a>
        </Box>
      </Box>
    </Box>
  )
}
