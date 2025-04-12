import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

interface ITextfieldSearch {
  value: string
  setValue: (_: string) => void
  placeholder?: string
}

export default function TextfieldSearch({
  value,
  setValue,
  placeholder = 'Pesquisar',
}: ITextfieldSearch) {
  return (
    <Box
      component="form"
      height="44px"
      width="100%"
      maxWidth="400px"
      borderRadius="22px"
      border={`1px solid #fe9a03`}
      display="flex"
      alignItems="center"
      px="12px"
      sx={{
        backgroundColor: 'transparent',
        transition: 'border-color 0.3s',
        '&:hover': {
          borderColor: '#cb7a01',
        },
        '&:focus-within': {
          borderColor: '#fe9a03',
        },
        '& input': {
          border: 'none',
          outline: 'none',
          flex: 1,
          fontSize: '14px',
          backgroundColor: 'transparent',
          color: 'inherit',
        },
      }}
    >
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton size="small">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}
