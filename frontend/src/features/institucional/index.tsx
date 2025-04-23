'use client'

import Box from '@mui/material/Box'
import Timeline from './TimeLine'
import OrganizationCdcCards from './OrganizationCdcCards'
import Leadership from './Leadership'
import Transparency from './Transparency'
import Faq from './Faq'
import VectorRoundedLines from '@/components/atoms/VectorRoundedLines'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useScrollToId } from '@/hooks/useScroll'

export default function InstitucionalPage() {
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

  return (
    <Box
      width="100%"
      p={{
        xs: '40px 16px',
        md: '40px 16px 160px 16px',
        lg: '32px 32px 160px 32px',
      }}
      position="relative"
    >
      <VectorRoundedLines left={0} margin="400px 0px 0px 0px" />
      <VectorRoundedLines rotate={true} right={0} margin="1200px 0px 0px 0px" />
      <Timeline />
      <OrganizationCdcCards />
      <Leadership />
      <Transparency />
      <Faq />
    </Box>
  )
}
