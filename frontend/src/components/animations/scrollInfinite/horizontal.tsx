'use client'

import { IParceiro } from '@/clients/api/parceiros'
import Box from '@mui/material/Box'
import React from 'react'

interface ScrollInfiniteHorizontalProps {
  items?: IParceiro[]
  itemWidth?: number
  maxWidth?: string | number
  itemHeight?: number
}

export default function ScrollInfiniteHorizontal({
  items,
  itemWidth = 210,
  itemHeight = 100,
  maxWidth = 1536,
}: ScrollInfiniteHorizontalProps) {
  const styles = {
    wrapper: {
      width: '90%',
      maxWidth: `${maxWidth}px`,
      marginInline: 'auto',
      position: 'relative',
      height: `${itemHeight}px`,
      overflow: 'hidden',
      maskImage:
        'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))',
    },
    item: {
      borderRadius: '6px',
      position: 'absolute',
      left: `max(calc(${itemWidth}px * ${items?.length}), 100%)`,
      animationName: 'scrollLeft',
      animationDuration: '30s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
  }

  return (
    <Box sx={styles.wrapper}>
      {items?.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            ...styles.item,
            width: `${itemWidth}px`,
            height: `100%`,
            backgroundImage: `url(${item.url_imagem})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            animationDelay: `calc(30s / ${items.length} * (${items.length} - ${index + 1}) * -1)`,
          }}
          aria-label={item.id.toString()}
        />
      ))}

      <style>{`
        @keyframes scrollLeft {
          to {
            left: -${itemWidth}px;
          }
        }
      `}</style>
    </Box>
  )
}
