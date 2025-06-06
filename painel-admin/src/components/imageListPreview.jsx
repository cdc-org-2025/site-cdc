import React from 'react'

const ImageListPreview = (props) => {
  const { record, property } = props
  const raw = record.params[property.path]

  console.log(record.params)
  if (!raw) return null

  const imagens = Array.isArray(raw) ? raw : [raw]

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {imagens.map((img, i) => {
        const isFullUrl = img.startsWith('http');
        const src = isFullUrl ? img : `https://storage.googleapis.com/cdc-site/${img}`;

        return (
          <img
            key={i}
            src={src}
            alt={`preview-${i}`}
            style={{
              maxHeight: '60px',
              borderRadius: '4px',
              objectFit: 'cover',
            }}
          />
        )
      })}
    </div>
  )
}

export default ImageListPreview
