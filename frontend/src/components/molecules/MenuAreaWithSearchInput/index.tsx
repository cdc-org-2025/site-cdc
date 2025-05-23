import React, { useEffect, useState } from 'react'
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
import TextfieldSearch from '@/components/atoms/Textfield/TextfieldSearch'
import { IArea } from '@/clients/api/areas'

interface IMenuAreas {
  areaSelect: string[]
  setAreaSelect: (_: any) => void
  listAreasAvailable: IArea[]
  title?: string
  valueInput: string
  setValueInput: (_: string) => void
  placeholderInput?: string
  onSearch?: (_: any) => void
}

export default function MenuAreasWithSearchInput({
  areaSelect,
  setAreaSelect,
  listAreasAvailable,
  title = 'Filtros',
  valueInput,
  setValueInput,
  placeholderInput,
  onSearch,
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Box width="100%">
        <Box
          display="flex"
          flexDirection="row"
          gap="24px"
          pb="24px"
          width="100%"
        >
          <Box maxWidth="128px" width="100%" height="44px">
            <ButtonTag
              height="44px"
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
              {title}
            </ButtonTag>
          </Box>
          <TextfieldSearch
            value={valueInput}
            setValue={setValueInput}
            placeholder={placeholderInput}
            onSearch={onSearch}
          />
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
        disableScrollLock
        sx={{ marginTop: '14px' }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <Box p="24px" >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="16px"
            width={"100%"}
          >
            <Typography variant="subtitle1">Áreas</Typography>
            <IconButton size="small" onClick={handleCloseMenu}>
              <CloseIcon
                sx={{ width: '16px', height: '16px', color: '#333' }}
              />
            </IconButton>
          </Box>
          <Box width={"100%"} maxWidth={800} display="flex" flexWrap={'wrap'} gap="12px">
            {listAreasAvailable?.map((item, index) => (
              <Box
                key={index}
                gap="12px"
              >
                <ButtonTag
                  key={item.id}
                  backgroundColor={
                    areaSelect.includes(item.nome) ? light : '#fff5e6'
                  }
                  startIcon={
                    areaSelect.includes(item.nome) && (
                      <CloseIcon
                        sx={{ width: '20px', height: '20px', color: '#222' }}
                      />
                    )
                  }
                  onClick={() => handleAreasSelect(item.nome)}
                >
                  {item.nome}
                </ButtonTag>
              </Box>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  )
}
