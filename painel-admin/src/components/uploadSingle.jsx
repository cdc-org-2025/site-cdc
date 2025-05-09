// UploadSingle.jsx ou UploadMultiple.jsx
import React from 'react';

const UploadSingle = (props) => {
  const { property, onChange, record } = props

  return (
    <div>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5em' }}>
        {property.label || 'Upload de arquivo'}
      </label>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0]
          onChange(property.name, file)
        }}
      />
    </div>
  )
}

export default UploadSingle
