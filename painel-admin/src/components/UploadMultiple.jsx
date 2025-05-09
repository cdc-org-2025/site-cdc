// import React from 'react'
// import { Box, DropZone, DropZoneItem } from '@adminjs/design-system'

// const UploadMultiple = (props) => {
//   const { onChange, property, record } = props
//   const uploadedFiles = record.params[property.path] || []

//   const handleUpload = (files) => {
//     const fileArray = Array.from(files)
//     onChange(property.path, fileArray)
//   }

//   return (
//     <Box>
//       <DropZone multiple onChange={handleUpload} />
//       {Array.isArray(uploadedFiles) && uploadedFiles.map((file, index) => (
//         <DropZoneItem key={index} filename={file.name || file} />
//       ))}
//     </Box>
//   )
// }

// export default UploadMultiple

import React from 'react'
import { Box, DropZone, DropZoneItem, Label } from '@adminjs/design-system'

const UploadMultiple = (props) => {
  const { onChange, property, record } = props
  const uploadedFiles = record.params[property.path] || []

  const handleUpload = (files) => {
    const fileArray = Array.from(files)
    onChange(property.path, fileArray)
  }

  return (
    <Box marginBottom="xl">
      {/* Exibe a label acima do campo */}
      {property.label && (
        <Label>{property.label || 'teste'}</Label>
      )}

      <DropZone multiple onChange={handleUpload} />

      {Array.isArray(uploadedFiles) && uploadedFiles.map((file, index) => (
        <DropZoneItem key={index} filename={file.name || file} />
      ))}
    </Box>
  )
}

export default UploadMultiple
