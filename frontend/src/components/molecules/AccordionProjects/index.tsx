'use client'
import React, { useEffect, useState } from 'react'
import AccordionProjectsDesktop from './desktop'
import AccordionProjectsMobile from './mobile'
import { IPrograma, useProgramasListAtivoQuery } from '@/clients/api/programas'
import { useMediaQuery, useTheme } from '@mui/material'

export default function AccordionProjects() {
  const { data, isLoading } = useProgramasListAtivoQuery()
  const dataset = data?.data.filter(item => item.is_ativo)
  const [expandedAccordion, setExpandedAccordion] = useState<IPrograma | undefined>()

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (dataset && dataset.length > 0 && !expandedAccordion) {
      setExpandedAccordion(dataset[0])
    }
  }, [dataset, expandedAccordion])

  if (isLoading || !dataset || dataset.length === 0) {
    return null
  }

  return isDesktop ? (
    <AccordionProjectsDesktop
      projectList={dataset}
      expandedAccordion={expandedAccordion}
      setExpandedAccordion={setExpandedAccordion}
    />
  ) : (
    <AccordionProjectsMobile
      projectList={dataset}
      expandedAccordion={expandedAccordion}
      setExpandedAccordion={setExpandedAccordion}
    />
  )
}
