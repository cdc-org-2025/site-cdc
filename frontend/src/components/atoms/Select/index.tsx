import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import { ControllerRenderProps } from 'react-hook-form'

interface ISelect {
  label: string
  error?: boolean
  helperText?: string
  field: ControllerRenderProps<any, any> // Vem do useForm via Controller
  options: { label: string; value: string | number }[]
}

export default function SelectComponent({
  label,
  error,
  helperText,
  field,
  options,
  ...props
}: ISelect) {
  return (
    <FormControl
      fullWidth
      error={error}
      variant="outlined"
      sx={{
        minHeight: '56px',
        paddingBottom: error ? '0' : '26.234px',
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'secondary.light',
        },
        '& .MuiFormHelperText-root': {
          fontSize: '12px',
        },
      }}
    >
      <InputLabel
        shrink
        sx={{
          color: 'text.secondary',
          background: '#f3f2ed',
          px: '8px',
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...field}
        {...props}
        fullWidth
        displayEmpty
        value={field?.value ?? ''}
        renderValue={(selected) => {
          if (!selected || selected === '') {
            return (
              <Typography
                variant="subtitle1"
                textTransform="none"
                color="text.secondary"
              >
                Selecione um motivo
              </Typography>
            )
          }
          return options.find((opt) => opt.value === selected)?.label || ''
        }}
        sx={{
          height: '56px',
          borderRadius: '16px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'secondary.light',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'secondary.light',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'secondary.light',
          },
          '& .MuiInputLabel-root.MuiFormLabel-filled': {
            color: 'secondary.light',
          },
          '& .MuiSelect-select': {
            color: 'text.primary',
            fontSize: '16px !important',
            lineHeight: '150%',
            padding: '12px',
          },
          span: {
            position: 'absolute',
          },
        }}
      >
        <MenuItem value="">
          <Typography
            variant="subtitle1"
            textTransform="none"
            color="text.secondary"
          >
            Selecione um motivo
          </Typography>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
