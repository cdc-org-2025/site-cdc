import React from 'react'
import { Box, Label } from '@adminjs/design-system'

const ToggleAtivo = (props) => {
  const { property, record, onChange } = props
  const value = record.params['is_ativo'] ?? true

  const handleToggle = () => {
    console.log('value')
    console.log(value)
    onChange('is_ativo', !value)
  }

  return (
    <Box marginBottom="xl">
      <Label>Projeto Ativo?</Label>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
        <label style={{
          position: 'relative',
          display: 'inline-block',
          width: '50px',
          height: '24px'
        }}>
          <input
            type="checkbox"
            checked={value}
            onChange={handleToggle}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: value ? '#2196F3' : '#ccc',
            transition: '.4s',
            borderRadius: '24px'
          }}></span>
          <span style={{
            position: 'absolute',
            content: '""',
            height: '18px',
            width: '18px',
            left: value ? '26px' : '4px',
            bottom: '3px',
            backgroundColor: 'white',
            transition: '.4s',
            borderRadius: '50%',
          }}></span>
        </label>
        <span style={{ marginLeft: '12px' }}>{value ? 'Ativo' : 'Desativado'}</span>
      </div>
    </Box>
  )
}

export default ToggleAtivo
