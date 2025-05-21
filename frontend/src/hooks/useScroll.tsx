import { useCallback, useEffect, useRef } from 'react'

export function useScrollToId(duration = 1000, offset = 100, maxRetries = 5) {
  const animationRef = useRef<number | null>(null)

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  const scrollToId = useCallback(
    (id: string, retry = 0) => {
      const element = document.getElementById(id)
      if (!element || !element.offsetParent) {
        // tenta novamente depois de 200ms, até atingir o número máximo de tentativas
        if (retry < maxRetries) {
          setTimeout(() => scrollToId(id, retry + 1), 200)
        }
        return
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      const startY = window.scrollY
      const targetY =
        element.getBoundingClientRect().top + window.scrollY - offset
      const distance = targetY - startY
      const startTime = performance.now()

      function scroll(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutQuad(progress)

        window.scrollTo(0, startY + distance * eased)

        if (elapsed < duration) {
          animationRef.current = requestAnimationFrame(scroll)
        } else {
          animationRef.current = null
        }
      }

      animationRef.current = requestAnimationFrame(scroll)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [duration, offset]
  )

  return scrollToId
}

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])
}
