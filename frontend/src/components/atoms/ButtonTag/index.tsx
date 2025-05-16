'use client'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

interface IButtonTag {
  onClick?: (
    // eslint-disable-next-line no-unused-vars
    arg?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void
  children: React.ReactNode
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
  backgroundColor?: string
  fullWidth?: boolean
  height?: string
  noAnimation?: boolean
}

export default function ButtonTag({
  onClick,
  children,
  endIcon,
  startIcon,
  backgroundColor = 'transparent',
  fullWidth = false,
  height = '40px',
  noAnimation
}: IButtonTag) {
  const {
    palette: { secondary, text },
  } = useTheme()
  return (
    <Box
      width={fullWidth ? '100%' : 'inherit'}
      component="button"
      onClick={onClick}
      sx={{
        height: height,
        padding: '11px 14px',
        borderRadius: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gap: '6px',
        backgroundColor: backgroundColor,
        border: `1px solid ${secondary.light}`,
        '&:hover': {
          backgroundColor: noAnimation ? 'transparent' : secondary.light,
        },
      }}
    >
      {startIcon}
      <Typography variant="subtitle2" color={text.primary}>
        {children}
      </Typography>
      {endIcon}
    </Box>
  )
}
