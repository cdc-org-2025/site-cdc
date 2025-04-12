'use client'
import AnimatedContent from './AnimatedContent'

interface IAnimetedSlide {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  distance?: number
  fullScreen?: boolean
  tension?: number
  friction?: number
}

export default function AnimetedSlide({
  children,
  direction,
  reverse,
  distance,
  fullScreen,
  tension = 50,
  friction = 25,
}: IAnimetedSlide) {
  return (
    <AnimatedContent
      distance={distance ?? 150}
      direction={direction ?? 'vertical'}
      reverse={reverse ?? true}
      config={{ tension: tension, friction: friction }}
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      fullScreen={fullScreen}
    >
      {children}
    </AnimatedContent>
  )
}
