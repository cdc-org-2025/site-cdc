import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import SearchIcon from '../../../assets/icon_search.svg'
import Image from 'next/image'
import { useState } from 'react'
import ButtonAction from '../ButtonAction'
import CloseIcon from '@mui/icons-material/Close'

export default function ButtonSearch() {
  const {
    palette: { primary, secondary, text },
  } = useTheme()
  const [modalSearch, setModalSearch] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')

  const handleClose = () => {
    setModalSearch(false)
    setInputText('')
  }

  const onSearch = () => {
    console.log(inputText)
    handleClose()
  }
  return (
    <>
      <IconButton
        sx={{ border: `1px solid ${secondary.light}` }}
        onClick={() => setModalSearch(true)}
      >
        <Image src={SearchIcon} alt="icone de pesquisa" />
      </IconButton>
      {modalSearch && (
        <Backdrop
          sx={(theme) => ({
            backgroundColor: '#171717E5',
            color: '#171717E5',
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={modalSearch}
        >
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginRight: '40px',
              marginTop: '40px',
              backgroundColor: secondary.light,
              color: text.primary,
              '&:hover': {
                color: primary.light,
                backgroundColor: primary.main,
              },
            }}
          >
            <CloseIcon color="inherit" />
          </IconButton>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="48px"
            width="100%"
            mx="80px"
          >
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="O que você esta procurando?"
              style={{
                height: '44px',
                width: '100%',
                borderRadius: '24px',
                border: `1px solid ${primary.light}`,
                backgroundColor: '#17171701',
                padding: '0px 28px',
                color: primary.light,
                fontWeight: 400,
                fontSize: '16px',
              }}
              type="text"
            />
            <Box maxWidth="120px">
              <ButtonAction onClick={onSearch}>Pesquisar</ButtonAction>
            </Box>
          </Box>
        </Backdrop>
      )}
    </>
  )
}
