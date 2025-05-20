'use client'

import React, {
  useEffect,
  useRef,
  useState,
  ReactElement,
  cloneElement,
} from 'react'
import { TypographyProps } from '@mui/material'

interface SplitTextProps {
  children: ReactElement<TypographyProps>
  delay?: number
  threshold?: number
  rootMargin?: string
}

const AnimationSplitText: React.FC<SplitTextProps> = ({
  children,
  delay = 80,
  threshold = 0.2,
  rootMargin = '-50px',
}) => {
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
  const words = content.split(' ')

  return cloneElement(children, {
    ref,
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

            .word {
              display: inline-block;
              opacity: 0;
              transform: translateY(20px);
              animation: fadeUp 0.4s ease forwards;
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
