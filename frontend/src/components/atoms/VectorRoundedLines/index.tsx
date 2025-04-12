import Box from '@mui/material/Box'
import React from 'react'
import VectorRoundedLinesImage from '../../../assets/background-elements/vector-rounded-lines.svg'
import Image from 'next/image'

interface IVectorRoundedLines {
  margin?: string
  right?: number
  left?: number
  bottom?: number
  top?: number
  rotate?: boolean
}

export default function VectorRoundedLines({
  margin = '0px 0px -30px 0px',
  right,
  left,
  bottom,
  top,
  rotate = false,
}: IVectorRoundedLines) {
  return (
    <Box
      position="absolute"
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      m={margin}
      zIndex={-1}
      display={{
        xs: 'none',
        md: 'block',
      }}
    >
      <Image
        src={VectorRoundedLinesImage}
        alt="vector rounded lines"
        style={{
          transform: rotate ? 'rotate(180deg)' : 'none',
        }}
      />
    </Box>
  )
}
