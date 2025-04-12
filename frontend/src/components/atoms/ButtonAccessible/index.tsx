import React from 'react'
import AccessibleIcon from '@mui/icons-material/Accessible'
import Box from '@mui/material/Box'

export default function ButtonAccessible() {
  return (
    <Box
      width="58px"
      height="58px"
      bgcolor="#4054b2"
      borderRadius={'29px'}
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      position="fixed"
      bottom={0}
      right={0}
      marginBottom={'90px'}
      marginRight={'34px'}
      border={'2px solid #fff'}
      sx={{ cursor: 'pointer' }}
    >
      <AccessibleIcon htmlColor="#fff" fontSize="large" />
    </Box>
  )
}
