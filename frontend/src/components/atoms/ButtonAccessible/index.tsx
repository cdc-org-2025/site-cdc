'use client'

import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import LogoAcessibilidade from "@/assets/logo-acessibilidade-dominio-publico-300x300.png"
import Image from 'next/image'
import { SettingsContext } from '@/context/settingsContext'
import { IconButton, Tooltip, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ButtonAccessible() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { increaseFont, decreaseFont, resetFont } = useContext(SettingsContext)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        width="58px"
        height="58px"
        bgcolor="#fff"
        borderRadius="29px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom={0}
        right={0}
        marginBottom="90px"
        marginRight="34px"
        border="2px solid #52c1ee"
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        zIndex={10}
      >
        <Tooltip title="Clique para acessar os recursos de acessibilidade" placement="left-start">
          <Image src={LogoAcessibilidade} width={50} height={50} alt="logo-acessib" />
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            bgcolor: '#fff',
            border: '2px solid #52c1ee',
            borderRadius: '8px',
          },
        }}
      >
        <Tooltip title="Tamanho da fonte" placement="left-start">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width="120px"
            px="10px"
            borderBottom='2px solid #52c1ee'
            pb="6px"
          >
            <IconButton
              size='small'
              style={{ width: "30px", height: "30px" }}
              onClick={(e) => {
                e.stopPropagation()
                increaseFont()
              }}
            >
              <AddCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
            <Typography fontSize={"20px"}>A a</Typography>
            <IconButton
              size='small'
              style={{ width: "30px", height: "30px" }}
              onClick={(e) => {
                e.stopPropagation()
                decreaseFont()
              }}
            >
              <RemoveCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Peso da fonte (EM CONSTRUÇÃO)" placement="left-start">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width="120px"
            px="10px"
            pt="6px"
          >
            <IconButton
              size='small'
              style={{ width: "30px", height: "30px" }}
              onClick={(e) => {
                e.stopPropagation()
                increaseFont()
              }}
            >
              <AddCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
            <Typography fontSize={"20px"}><span style={{ fontWeight: 700 }}>A</span> A</Typography>
            <IconButton
              size='small'
              style={{ width: "30px", height: "30px" }}
              onClick={(e) => {
                e.stopPropagation()
                decreaseFont()
              }}
            >
              <RemoveCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
          </Box>
        </Tooltip>
      </Menu>
    </>
  )
}
