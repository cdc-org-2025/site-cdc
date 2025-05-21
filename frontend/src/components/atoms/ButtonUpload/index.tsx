import React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface UploadFieldProps {
  label: string
  error?: boolean
  placeholder: string
  helperText?: string
  onFileSelect: (_: File | null) => void
  fileName?: string
  disabled?: boolean
}

export default function ButtonUpload({
  label,
  error,
  helperText,
  onFileSelect,
  fileName,
  disabled,
  placeholder,
}: UploadFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onFileSelect(file)
  }

  return (
    <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
        accept=".pdf,.doc,.docx"
      />

      <TextField
        label={label}
        variant="outlined"
        value={fileName ?? ''}
        placeholder={placeholder}
        fullWidth
        disabled={disabled}
        error={error}
        helperText={helperText}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <UploadFileIcon
                sx={{ color: 'text.secondary' }}
                fontSize="small"
              />
            </InputAdornment>
          ),
        }}
        sx={{
          pointerEvents: 'none',
          '& label': {
            color: 'text.secondary',
            background: 'inherit',
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
          '& .MuiInputBase-input': {
            cursor: 'pointer',
            color: 'text.primary',
            fontSize: '16px !important',
            lineHeight: '150%',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '12px',
          },
        }}
      />
    </Box>
  )
}
