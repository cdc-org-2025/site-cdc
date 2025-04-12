'use client'

import { useSprings, animated } from '@react-spring/web'
import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  cloneElement,
  ReactElement,
} from 'react'
import { TypographyProps, useTheme } from '@mui/material'

interface SplitTextProps {
  children: ReactElement<TypographyProps>
  delay?: number
  animationFrom?: { opacity: number; transform: string }
  animationTo?: { opacity: number; transform: string }
  easing?: (_: number) => number
  threshold?: number
  rootMargin?: string
  onLetterAnimationComplete?: () => void
}

const AnimationSplitText: React.FC<SplitTextProps> = ({
  children,
  delay = 5,
  animationFrom = { opacity: 0, transform: 'translate3d(0,-20px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = (t: number) => t,
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
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join(' ')
    if (typeof node === 'object' && node !== null && 'props' in node) {
      return extractText(node.props.children)
    }
    return ''
  }

  const content = extractText(children)
  const words = content.split(' ')
  const letters = words.map((word) => word.split(''))

  const variant = children.props.variant || 'body1' // Padrão para evitar erros
  const fontSize = theme.typography[variant]?.fontSize || 'inherit'
  const fontWeight = theme.typography[variant]?.fontWeight || 'inherit'

  const springs = useSprings(
    letters.flat().length,
    letters.flat().map((_, i) => ({
      from: animationFrom,
      to: inView ? animationTo : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  )

  return cloneElement(children, {
    ref,
    component: 'span',
    sx: {
      display: 'inline-block',
      wordSpacing: 'inherit',
      whiteSpace: 'pre-wrap',
      fontSize,
      fontWeight,
      textAlign: children.props.textAlign || 'inherit',
      ...children.props.sx,
    },
    children: words.map((word, wordIndex) => (
      <span
        key={wordIndex}
        style={{ display: 'inline-block', marginRight: '0.3em' }}
      >
        {word.split('').map((letter, letterIndex) => {
          const index =
            words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
            letterIndex

          return (
            <animated.span
              key={index}
              style={{
                ...springs[index],
                display: 'inline-block',
                willChange: 'transform, opacity',
                fontSize,
                fontWeight,
                color: 'inherit',
              }}
            >
              {letter}
            </animated.span>
          )
        })}
      </span>
    )),
  })
}

export default AnimationSplitText
