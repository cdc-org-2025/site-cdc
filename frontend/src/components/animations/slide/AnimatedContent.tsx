'use client'
import { useSpring, animated, SpringConfig } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  config?: SpringConfig
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  delay?: number
  fullScreen?: boolean
  threshold?: number
}

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  fullScreen = false,
  threshold = 0.2,
}: AnimatedContentProps) => {
  const directions = {
    vertical: 'Y',
    horizontal: 'X',
  }

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  })

  const springProps = useSpring({
    to: {
      transform: inView
        ? `translate${directions[direction]}(0px) scale(1)`
        : `translate${directions[direction]}(${reverse ? `-${distance}px` : `${distance}px`}) scale(${scale})`,
      opacity: inView ? 1 : animateOpacity ? initialOpacity : 1,
    },
    config,
    delay,
  })

  return (
    <animated.div
      ref={ref}
      style={{
        ...springProps,
        width: fullScreen ? '100vw' : '100%',
        height: fullScreen ? '100vh' : '100%',
        maxWidth: '100%',
        position: fullScreen ? 'absolute' : 'relative',
        boxSizing: 'border-box',
        top: 0,
        left: 0,
      }}
    >
      {children}
    </animated.div>
  )
}

export default AnimatedContent
