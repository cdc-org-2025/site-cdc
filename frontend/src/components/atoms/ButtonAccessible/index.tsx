'use client'

import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import LogoAcessibilidade from "@/assets/logo-acessibilidade-dominio-publico-300x300.png"
import Image from 'next/image'
import { SettingsContext } from '@/context/settingsContext'
import {
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Switch,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

export default function ButtonAccessible() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {
    increaseFont,
    decreaseFont,
    increaseFontWeight,
    decreaseFontWeight,
    toggleGrayscale,
    toggleHighContrast,
    toggleNegativeContrast,
    grayscale,
    highContrast,
    negativeContrast,
  } = useContext(SettingsContext)

  const open = Boolean(anchorEl)
  const { palette: { primary } } = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const contrastOptions = [
    {
      label: 'Escala de Cinza',
      checked: grayscale,
      onToggle: toggleGrayscale,
      tooltip: 'Aplicar escala de cinza',
    },
    {
      label: 'Alto Contraste',
      checked: highContrast,
      onToggle: toggleHighContrast,
      tooltip: 'Ativar alto contraste',
    },
    {
      label: 'Contraste Negativo',
      checked: negativeContrast,
      onToggle: toggleNegativeContrast,
      tooltip: 'Ativar contraste negativo (modo invertido)',
    },
  ]

  return (
    <>
      <Box
        width="58px"
        height="58px"
        bgcolor={primary.light}
        borderRadius="29px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        bottom={90}
        right={0}
        marginBottom={{ xs: "0px", sm: "90px" }}
        marginRight={{ xs: "0px", sm: "16px" }}
        border="2px solid #52c1ee"
        sx={{
          cursor: 'pointer',
          zIndex: 1300,
          backdropFilter: 'none',
        }}
        onClick={handleClick}
      >
        <Tooltip title="Clique para acessar os recursos de acessibilidade" placement="left-start">
          <Image src={LogoAcessibilidade} width={50} height={50} alt="logo-acessib" />
        </Tooltip>
      </Box>

      <Menu
        disableScrollLock
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
            bgcolor: primary.light,
            border: '2px solid #52c1ee',
            borderRadius: '8px',
            paddingX: '8px',
            width: '220px',
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            padding: 0,
          },
        }}
      >
        {/* Font Size */}
        <Tooltip title="Aumentar ou diminuir o tamanho da fonte" placement="left-start">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            borderBottom='2px solid #52c1ee'
          >
            <IconButton
              size="small"
              aria-label="Aumentar fonte"
              onClick={(e) => {
                e.stopPropagation()
                increaseFont()
              }}
            >
              <AddCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
            <Typography fontSize="20px">A a</Typography>
            <IconButton
              size="small"
              aria-label="Diminuir fonte"
              onClick={(e) => {
                e.stopPropagation()
                decreaseFont()
              }}
            >
              <RemoveCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
          </Box>
        </Tooltip>

        {/* Font Weight */}
        <Tooltip title="Aumentar ou diminuir o peso da fonte" placement="left-start">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            borderBottom='2px solid #52c1ee'
          >
            <IconButton
              size="small"
              aria-label="Aumentar peso da fonte"
              onClick={(e) => {
                e.stopPropagation()
                increaseFontWeight()
              }}
            >
              <AddCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
            <Typography fontSize="20px">
              <span style={{ fontWeight: 700 }}>A</span> A
            </Typography>
            <IconButton
              size="small"
              aria-label="Diminuir peso da fonte"
              onClick={(e) => {
                e.stopPropagation()
                decreaseFontWeight()
              }}
            >
              <RemoveCircleOutlineIcon style={{ width: 25 }} htmlColor='#52c1ee' />
            </IconButton>
          </Box>
        </Tooltip>

        {/* Switches de Contraste */}
        {contrastOptions.map(({ label, checked, onToggle, tooltip }, index) => (
          <Tooltip key={label} title={tooltip} placement="left-start">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              px="10px"
              pt="6px"
              pb="6px"
              borderBottom={index < contrastOptions.length - 1 ? '2px solid #52c1ee' : 'none'}
            >
              <Typography fontSize="16px" color="text.primary">
                {label}
              </Typography>
              <Switch
                checked={checked}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#52c1ee',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#52c1ee',
                  },
                }}
              />
            </Box>
          </Tooltip>
        ))}
      </Menu>
    </>
  )
}
