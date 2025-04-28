'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useScrollToId } from '@/hooks/useScroll'

export default function SearchScrollHandler() {
  const searchParams = useSearchParams()
  const scrollView = searchParams.get('scrollView')
  const scrollToId = useScrollToId()

  useEffect(() => {
    if (scrollView) {
      const timeout = setTimeout(() => {
        scrollToId(scrollView)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [scrollView, scrollToId])

  return null
}
