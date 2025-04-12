import React, { useState } from 'react'
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

interface IMenuAreas {
  areaSelect: string[]
  setAreaSelect: (_: any) => void
  listAreasAvailable: string[][]
}

export default function MenuAreas({
  areaSelect,
  setAreaSelect,
  listAreasAvailable,
}: IMenuAreas) {
  const {
    palette: {
      secondary: { light },
    },
  } = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleAreasSelect = (area: string) => {
    setAreaSelect((prev: string[]) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const handleClickMenu = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    if (event) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap="16px" mt="24px" mb="24px">
        <Box width="128px" height="44px">
          <ButtonTag
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(
              event?:
                | React.MouseEvent<HTMLButtonElement, MouseEvent>
                | undefined
            ) => handleClickMenu(event)}
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
        <Box display="flex" flexWrap="wrap" gap="16px">
          {areaSelect.map((area) => (
            <ButtonAction
              key={area}
              onClick={() => handleAreasSelect(area)}
              fullWidth={false}
              startIcon={<CloseIcon fontSize="small" />}
            >
              {area}
            </ButtonAction>
          ))}
        </Box>
      </Box>
      <Menu
        sx={{ marginTop: '14px' }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <Box p="24px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="16px"
          >
            <Typography variant="subtitle1">Áreas</Typography>
            <IconButton size="small" onClick={handleCloseMenu}>
              <CloseIcon
                sx={{ width: '16px', height: '16px', color: '#333' }}
              />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" gap="12px">
            {listAreasAvailable?.map((linha, index) => (
              <Box
                key={index}
                display="grid"
                gridTemplateColumns={`repeat(${linha.length}, auto)`}
                gap="12px"
              >
                {linha?.map((area) => (
                  <ButtonTag
                    key={area}
                    backgroundColor={
                      areaSelect.includes(area) ? light : '#fff5e6'
                    }
                    startIcon={
                      areaSelect.includes(area) && (
                        <CloseIcon
                          sx={{ width: '20px', height: '20px', color: '#222' }}
                        />
                      )
                    }
                    onClick={() => handleAreasSelect(area)}
                  >
                    {area}
                  </ButtonTag>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  )
}
