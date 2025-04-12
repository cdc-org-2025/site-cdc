import React from 'react'
import TextField from '@mui/material/TextField'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ITextfield {
  label: string
  placeholder?: string
  error?: boolean
  helperText?: string
  register?: UseFormRegisterReturn
  rows?: number
  disabled?: boolean
  readOnly?: boolean
}

export default function TextfieldComponent({
  label,
  placeholder,
  error,
  helperText,
  register,
  rows,
  disabled,
  readOnly,
  ...props
}: ITextfield) {
  return (
    <TextField
      disabled={disabled}
      label={label}
      variant="outlined"
      placeholder={placeholder}
      multiline={rows && rows > 1 ? true : false}
      rows={rows ?? 1}
      fullWidth
      error={error}
      helperText={helperText}
      {...register}
      {...props}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        readOnly: readOnly,
      }}
      sx={{
        '& label': {
          color: 'text.secondary',
          background: '#f3f2ed',
          px: '8px',
        },
        '& label.Mui-focused': {
          color: 'secondary.light',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          minHeight: '56px',
          '& fieldset': {
            borderColor: 'secondary.light',
          },
          '&:hover fieldset': {
            borderColor: 'secondary.light',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          paddingTop: '8px',
          paddingRight: '0px',
        },
        '& .MuiInputBase-input': {
          color: 'text.primary',
          fontSize: '16px !important',
          lineHeight: '150%',
        },
        '& .MuiFormHelperText-root': {
          fontSize: '12px',
        },
        span: {
          position: 'absolute',
        },
        paddingBottom: error ? '0' : '26.234px',
      }}
    />
  )
}
