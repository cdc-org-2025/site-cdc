import React from 'react'
import Box from '@mui/material/Box'
import LogoAcessibilidade from "@/assets/logo-acessibilidade-dominio-publico-300x300.png"
import Image from 'next/image'

export default function ButtonAccessible() {
  return (
    <Box
      width="58px"
      height="58px"
      bgcolor="#fff"
      borderRadius={'29px'}
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      position="fixed"
      bottom={0}
      right={0}
      marginBottom={'90px'}
      marginRight={'34px'}
      border={'2px solid #52c1ee'}
      sx={{ cursor: 'pointer' }}
    >
      <Image src={LogoAcessibilidade} width={50} height={50} alt="logo-acessib" />
    </Box>
  )
}
