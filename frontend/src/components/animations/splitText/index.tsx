'use client'

import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  cloneElement,
} from 'react'
import { TypographyProps, useTheme } from '@mui/material'

interface SplitTextProps {
  children: ReactElement<TypographyProps>
  delay?: number
  threshold?: number
  rootMargin?: string
}

const AnimationSplitText: React.FC<SplitTextProps> = ({
  children,
  delay = 2.50,
  threshold = 0.2,
  rootMargin = '-50px',
}) => {
  const theme: any = useTheme()
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join(' ')
    if (typeof node === 'object' && node !== null && 'props' in node)
      return extractText((node as any).props.children)
    return ''
  }

  const content = extractText(children)
  const letters = content.split('')
  const variant = children.props.variant || 'body1'
  const fontSize = theme.typography[variant]?.fontSize || 'inherit'
  const fontWeight = theme.typography[variant]?.fontWeight || 'inherit'

  return cloneElement(children, {
    ref,
    component: 'span',
    sx: {
      display: 'inline-block',
      whiteSpace: 'pre-wrap',
      fontSize,
      fontWeight,
      ...children.props.sx,
    },
    children: (
      <>
        <style>
          {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .letter {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.25s ease forwards;
          }
        `}
        </style>
        {letters.map((char, index) => (
          <span
            key={index}
            className="letter"
            style={{
              animationDelay: inView ? `${index * delay}ms` : '0ms',
              fontSize,
              fontWeight,
              color: 'inherit',
            }}
          >
            {char}
          </span>
        ))}
      </>
    ),
  })
}

export default AnimationSplitText
