'use client'

import * as React from 'react'
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
  Stack,
  useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { IMenu, ISubMenu } from '@/constants/menuNavigation'
import { useRouter } from 'next/navigation'
import { useNavigation } from '@/hooks/useNavigation'

export default function NavbarDesktop({ menuOption }: { menuOption: IMenu[] }) {
  const [openMenuId, setOpenMenuId] = React.useState<number | null>(null)
  const anchorRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const {
    palette: { primary, text },
  } = useTheme()
  const { push } = useRouter()
  const { handleSubMenuClick } = useNavigation()

  const handleMouseEnter = (id: number) => setOpenMenuId(id)
  const handleMouseLeave = () => setOpenMenuId(null)

  const handleClose = (event: Event | React.SyntheticEvent, id: number) => {
    if (
      anchorRefs.current[id] &&
      anchorRefs.current[id]!.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpenMenuId(null)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab' || event.key === 'Escape') {
      setOpenMenuId(null)
    }
  }

  const handleSubMenu = (subItem: ISubMenu, labelItem: string) => {
    handleSubMenuClick(subItem, labelItem)
    setOpenMenuId(null)
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      minWidth={0}
      overflow="hidden"
      display={{
        xs: 'none',
        lg: 'flex',
      }}
    >
      {menuOption?.map((item, index) => (
        <div
          key={item.id}
          onMouseEnter={() => item.subMenus && handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            ref={(el) => {
              if (el instanceof HTMLButtonElement) {
                anchorRefs.current[index] = el
              }
            }}
            aria-controls={openMenuId === item.id ? 'menu-list' : undefined}
            aria-haspopup="true"
            onClick={() => item?.link && push(item.link)}
            size="small"
            sx={{
              color: openMenuId === item.id ? primary.main : text.primary,
              height: '34px',
              backgroundColor: 'transparent',
              whiteSpace: 'nowrap',
              minWidth: 0,
              '&:hover': {
                color: primary.main,
                backgroundColor: 'transparent',
              },
            }}
          >
            <Typography variant="overline" textTransform="none">
              {item.label}
            </Typography>
            {item.subMenus &&
              (openMenuId === item.id ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ExpandLessIcon fontSize="small" />
              ))}
          </Button>

          {item.subMenus && (
            <Popper
              open={openMenuId === item.id}
              anchorEl={anchorRefs.current[index]}
              role={undefined}
              placement="bottom"
              transition
              disablePortal
              sx={{ zIndex: 1, overflowX: 'hidden' }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper
                    sx={{
                      boxShadow: '0px 4px 25px 0px #0000001A',
                      backgroundColor: primary.light,
                    }}
                  >
                    <ClickAwayListener onClickAway={(e) => handleClose(e, item.id)}>
                      <MenuList
                        id="menu-list"
                        aria-labelledby="menu-button"
                        onKeyDown={handleListKeyDown}
                        sx={{
                          paddingBottom: '8px',
                          paddingTop: '0px',
                          marginTop: '16px',
                        }}
                      >
                        {item?.subMenus?.map((subItem: ISubMenu) => (
                          <MenuItem
                            key={subItem.id}
                            onClick={() => handleSubMenu(subItem, item.label)}
                            sx={{
                              borderBottom: '1px solid #00000030',
                              height: '46px',
                              '&:hover': {
                                backgroundColor: 'transparent',
                                color: primary.main,
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              textAlign="center"
                              width="100%"
                            >
                              {subItem.label}
                            </Typography>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          )}
        </div>
      ))}
    </Stack>
  )
}
