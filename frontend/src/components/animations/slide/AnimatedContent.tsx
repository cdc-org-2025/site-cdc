import { useRef, useEffect, useState, ReactNode } from 'react'
import { useSpring, animated, SpringConfig } from '@react-spring/web'

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  config?: SpringConfig
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  fullScreen?: boolean
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  fullScreen = false,
}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element)
          setTimeout(() => {
            setInView(true)
          }, delay)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, delay])

  const directions: Record<'vertical' | 'horizontal', string> = {
    vertical: 'Y',
    horizontal: 'X',
  }

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${
        reverse ? `-${distance}px` : `${distance}px`
      }) scale(${scale})`,
      opacity: animateOpacity ? initialOpacity : 1,
    },
    to: inView
      ? {
          transform: `translate${directions[direction]}(0px) scale(1)`,
          opacity: 1,
        }
      : undefined,
    config,
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
