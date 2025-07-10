'use client'

import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  cloneElement,
  useContext,
} from 'react'
import { TypographyProps } from '@mui/material'
import { SettingsContext } from '@/context/settingsContext'

interface SplitTextProps {
  children: ReactElement<TypographyProps>
  delay?: number
  threshold?: number
  rootMargin?: string
  direction?: 'up' | 'down'
  initialFontWeight?: number
}

const AnimationSplitText: React.FC<SplitTextProps> = ({
  children,
  delay = 80,
  threshold = 0.6,
  rootMargin = '0px',
  direction = 'up',
  initialFontWeight = 700,
}) => {
  const { fontScale, fontWeightScale } = useContext(SettingsContext)
  const markerRef = useRef<HTMLSpanElement>(null)
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
    if (markerRef.current) observer.observe(markerRef.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join(' ')
    if (typeof node === 'object' && node !== null && 'props' in node)
      return extractText((node as any).props.children)
    return ''
  }

  const scaleFontSize = (value: string): string => {
    const remMatch = value.match(/^([\d.]+)rem$/)
    const pxMatch = value.match(/^([\d.]+)px$/)

    if (remMatch) {
      const scaled = parseFloat(remMatch[1]) * fontScale
      return `${scaled}rem`
    } else if (pxMatch) {
      const scaled = parseFloat(pxMatch[1]) * fontScale
      return `${scaled}px`
    }

    return value // fallback (ex: em, %, etc.)
  }

  const scaleFontSizeProp = (
    fontSize: any['fontSize']
  ): TypographyProps['fontSize'] => {
    if (typeof fontSize === 'string') return scaleFontSize(fontSize)
    if (typeof fontSize === 'number') return `${fontSize * fontScale}px`

    if (typeof fontSize === 'object') {
      const scaled: Record<string, string> = {}
      for (const key in fontSize) {
        scaled[key] = scaleFontSize(String(fontSize[key]))
      }
      return scaled
    }

    return undefined
  }

  const content = extractText(children)
  const words = content.split(' ')
  const initialTranslate = direction === 'up' ? 'translateY(20px)' : 'translateY(-20px)'

  const originalFontSize = children.props.fontSize
  const scaledFontSize = scaleFontSizeProp(originalFontSize)
  const scaledFontWeight = initialFontWeight * fontWeightScale

  return cloneElement(children, {
    fontSize: scaledFontSize,
    fontWeight: scaledFontWeight,
    children: (
      <>
        <span ref={markerRef} style={{ display: 'inline-block', width: 1, height: 1 }} />
        <style>
          {`
            @keyframes fadeMove {
              0% {
                opacity: 0;
                transform: ${initialTranslate};
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .word {
              display: inline-block;
              opacity: 0;
              transform: ${initialTranslate};
              animation: fadeMove 0.4s ease forwards;
              white-space: nowrap;
            }
          `}
        </style>
        {words.map((word, index) => (
          <span
            key={index}
            className="word"
            style={{
              animationDelay: inView ? `${index * delay}ms` : '0ms',
              animationPlayState: inView ? 'running' : 'paused',
              marginRight: '0.25em',
              color: 'inherit',
            }}
          >
            {word}
          </span>
        ))}
      </>
    ),
  })
}

export default AnimationSplitText
