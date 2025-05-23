'use client'
import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import { useInView } from 'react-intersection-observer'

interface ZoomOutOnViewProps {
  children: ReactNode
  threshold?: number
  delay?: number
  duration?: string
  scaleFrom?: number
}

export default function ZoomOutOnView({
  children,
  threshold = 0.3,
  delay = 0,
  duration = '1.2s',
  scaleFrom = 1.1,
}: ZoomOutOnViewProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      sx={{
        display: 'inline-block',
        overflow: 'hidden',
        width: '100%',
        height: "100%",
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : `scale(${scaleFrom})`,
        transition: `opacity ${duration} ease-out ${delay}ms, transform ${duration} ease-out ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  )
}
