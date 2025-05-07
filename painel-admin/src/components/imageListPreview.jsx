// import React from 'react'

// const ImageListPreview = (props) => {
//   const { record, property } = props
//   const rawPath = record.params[property.path]

//   if (!rawPath) return null

//   const fullUrl = `https://storage.googleapis.com/cdc-site/${rawPath}`

//   return (
//     <img
//       src={fullUrl}
//       alt="preview"
//       style={{
//         maxHeight: '60px',
//         borderRadius: '4px',
//         objectFit: 'cover',
//       }}
//     />
//   )
// }

// export default ImageListPreview

import React from 'react'

const ImageListPreview = (props) => {
  const { record, property } = props
  const raw = record.params[property.path]

  if (!raw) return null

  const imagens = Array.isArray(raw) ? raw : [raw] // garante array

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {imagens.map((img, i) => (
        <img
          key={i}
          src={`https://storage.googleapis.com/cdc-site/${img}`}
          alt={`preview-${i}`}
          style={{
            maxHeight: '60px',
            borderRadius: '4px',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  )
}

export default ImageListPreview

