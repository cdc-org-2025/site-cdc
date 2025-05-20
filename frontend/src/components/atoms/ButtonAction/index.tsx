'use client'
import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface IButtonAction {
  children: React.ReactNode
  onClick?: () => void
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  backgroundColor?: string
  variant?: 'text' | 'contained' | 'outlined'
  borderColor?: string
  fullWidth?: boolean
}

export default function ButtonAction({
  children,
  onClick,
  startIcon,
  endIcon,
  type,
  disabled,
  backgroundColor = 'secondary.light',
  variant = 'contained',
  borderColor,
  fullWidth = true,
}: IButtonAction) {
  return (
    <Button
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      variant={variant}
      sx={{
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderRadius: '32px',
        color: "#222",
        '&:hover': {
          color: "#222",
          backgroundColor: '#cb7a01',
        },
      }}
      onClick={onClick}
      size="large"
      startIcon={startIcon}
      endIcon={endIcon}
    >
      <Typography component="p" variant="subtitle1" textTransform="none">
        {children}
      </Typography>
    </Button>
  )
}
