'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useScrollToId } from '@/hooks/useScroll'

export default function SearchScrollHandler() {
  const searchParams = useSearchParams()
  const scrollView = searchParams.get('scrollView')
  const scrollToId = useScrollToId()
  const [hasScrolled, setHasScrolled] = useState(false)
  const lastHeight = useRef<number | null>(null)
  const retries = useRef(0)

  useEffect(() => {
    if (!scrollView || hasScrolled) return

    const interval = setInterval(() => {
      const element = document.getElementById(scrollView)
      const currentHeight = document.body.scrollHeight

      if (element && currentHeight === lastHeight.current) {
        scrollToId(scrollView)
        setHasScrolled(true)
        clearInterval(interval)
      }

      lastHeight.current = currentHeight

      if (retries.current > 10) {
        clearInterval(interval)
      }

      retries.current += 1
    }, 200)

    return () => clearInterval(interval)
  }, [scrollView, scrollToId, hasScrolled])

  return null
}
