import { useCallback } from 'react'

export function useScrollToId(duration = 1000, offset = 100) {
  const scrollToId = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (!element) return

      const startY = window.scrollY
      const targetY =
        element.getBoundingClientRect().top + window.scrollY - offset
      const distance = targetY - startY
      const startTime = performance.now()

      function scroll(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        const easeInOut =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress

        window.scrollTo(0, startY + distance * easeInOut)

        if (elapsed < duration) {
          requestAnimationFrame(scroll)
        }
      }

      requestAnimationFrame(scroll)
    },
    [duration, offset]
  )

  return scrollToId
}
