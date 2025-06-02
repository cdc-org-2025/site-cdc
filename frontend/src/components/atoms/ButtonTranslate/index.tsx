'use client'
import Box from '@mui/material/Box'

export default function GoogleTranslate() {
  return (
    <Box
      id="google_translate_element"
      sx={{
        '& .goog-te-gadget': {
          fontSize: '16px',
          fontFamily: 'Lato, sans-serif',
          color: '#444',
        },
        '& select': {
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          color: '#333',
        },
        zIndex: 99,
        position: "fixed",
        right: 0,
        bottom: 0
      }}
      marginBottom={{ xs: "0px", sm: "90px" }}
    />
  )
}
