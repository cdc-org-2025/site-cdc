import Box from '@mui/material/Box'
import React from 'react'

interface ICircle {
  width?: string
  height?: string
  children?: React.ReactNode
  color?: string
  minHeight?: string
}

export default function Circle({
  children,
  width = '120px',
  height = '120px',
  minHeight = '120px',
  color = '#FE9A03',
}: ICircle) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={width}
      height={height}
      minHeight={minHeight}
      bgcolor={color}
      borderRadius="50%"
    >
      {children}
    </Box>
  )
}
