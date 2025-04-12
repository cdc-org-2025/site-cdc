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

export default function InstitucionalPage() {
  const searchParams = useSearchParams()
  const scrollView = searchParams.get('scrollView')

  useEffect(() => {
    if (scrollView) {
      const element = document.getElementById(scrollView)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        window.scrollBy(0, -100)
      }
    }
  }, [scrollView])

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
