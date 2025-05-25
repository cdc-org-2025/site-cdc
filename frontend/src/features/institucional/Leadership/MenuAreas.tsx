'use client'

import React, { useCallback, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import ButtonTag from '@/components/atoms/ButtonTag'
import ButtonAction from '@/components/atoms/ButtonAction'
import { IArea } from '@/clients/api/areas'

interface IMenuAreas {
  areaSelect: IArea[]
  setAreaSelect: (_: IArea[]) => void
  listAreasAvailable?: IArea[]
  liderancas?: boolean
}

export default function MenuAreas({
  areaSelect,
  setAreaSelect,
  listAreasAvailable,
  liderancas = false
}: IMenuAreas) {
  const {
    palette: {
      background,
      primary,
      secondary: { light },
      text
    },
  } = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleAreasSelect = useCallback((area: IArea) => {
    const alreadySelected = areaSelect.some((a) => a.id === area.id);

    const updated = alreadySelected
      ? areaSelect.filter((a) => a.id !== area.id)
      : [...areaSelect, area];

    setAreaSelect(updated);
  }, [areaSelect, setAreaSelect]);

  const handleClickMenu = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      if (event) setAnchorEl(event.currentTarget)
    },
    []
  )

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" mt="24px" mb="24px">
        <Box width="128px" height="44px">
          <ButtonTag
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickMenu}
            endIcon={
              open ? (
                <ExpandLessIcon htmlColor="#222" fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" htmlColor="#222" />
              )
            }
          >
            Áreas
          </ButtonTag>
        </Box>

        <Box display="flex" flexWrap="wrap" gap="16px" >
          {areaSelect?.map((area) => (
            <ButtonAction
              key={area.id}
              onClick={() => handleAreasSelect(area)}
              fullWidth={false}
              startIcon={<CloseIcon fontSize="small" />}
            >
              {area.nome}
            </ButtonAction>
          ))}
        </Box>
      </Box>

      <Menu
        disableScrollLock
        sx={{ marginTop: '14px' }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            padding: 0,
          },
        }}
      >
        <Box p="24px" bgcolor={liderancas ? primary.light : 'inherit'}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="16px"
          >
            <Typography variant="subtitle1">Áreas</Typography>
            <IconButton
              size="small"
              onClick={handleCloseMenu}
              aria-label="Fechar menu de áreas"
            >
              <CloseIcon sx={{ width: 16, height: 16, color: '#222' }} />
            </IconButton>
          </Box>

          <Box display="flex" gap="12px" maxWidth={'310px'} flexWrap={'wrap'}>
            {listAreasAvailable?.map((area) => (
              <ButtonTag
                key={area.id}
                backgroundColor={
                  areaSelect.some((a) => a.id === area.id) ? light : liderancas ? primary.light : background.paper
                }
                startIcon={
                  areaSelect?.includes(area) && (
                    <CloseIcon sx={{ width: 20, height: 20, color: '#222' }} />
                  )
                }
                onClick={() => handleAreasSelect(area)}
              >
                {area?.nome}
              </ButtonTag>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  )
}
