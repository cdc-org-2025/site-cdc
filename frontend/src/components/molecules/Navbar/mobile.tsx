import ButtonSearch from '@/components/atoms/ButtonSearch'
import { ISubMenu, MenuOptions } from '@/constants/menuNavigation'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigation } from '@/hooks/useNavigation'

interface INavbarMobile {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavbarMobile({ setOpen }: INavbarMobile) {
  const {
    palette: { secondary },
  } = useTheme()
  const { handleNavigate, handleSubMenuClick } = useNavigation()

  const handleSubMenu = (subItem: ISubMenu, labelItem: string) => {
    handleSubMenuClick(subItem, labelItem)
    setOpen(false)
  }

  return (
    <Box
      position={'fixed'}
      left={0}
      top={0}
      width={'100vw'}
      height={'100vh'}
      mt="94px"
      sx={{
        backgroundColor: '#f3f2ed',
        zIndex: 1,
      }}
      pl={'16px'}
    >
      <Box my={'48px'}>
        <ButtonSearch />
      </Box>
      {MenuOptions.map((item) => (
        <Box key={item.id}>
          {!item.subMenus ? (
            <Button
              sx={{
                color: secondary.dark,
                height: '34px',
                mb: '20px',
              }}
              onClick={() => handleNavigate(item.link)}
            >
              <Typography variant="overline" fontWeight={700}>
                {item.label}
              </Typography>
            </Button>
          ) : (
            <Typography variant="overline" fontWeight={700} pb="20px" pl="8px">
              {item.label}
            </Typography>
          )}
          {item.subMenus && (
            <Box
              display={'flex'}
              flexDirection="column"
              gap="14px"
              mb="40px"
              mt="10px"
            >
              {item.subMenus?.map((subMenu: ISubMenu) => (
                <Button
                  key={subMenu.id}
                  sx={{
                    color: secondary.dark,
                    pl: '24px',
                    mr: '24px',
                    height: '28px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  onClick={() => handleSubMenu(subMenu, item.label)}
                >
                  <Typography variant="overline" textTransform="capitalize">
                    {subMenu.label}
                  </Typography>
                </Button>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
