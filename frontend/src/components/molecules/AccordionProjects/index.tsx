'use client'
import React, { useEffect, useState } from 'react'
import AccordionProjectsDesktop from './desktop'
import AccordionProjectsMobile from './mobile'
import { IPrograma, useProgramasListQuery } from '@/clients/api/programas'
import { useMediaQuery, useTheme } from '@mui/material'

export default function AccordionProjects() {
  const { data } = useProgramasListQuery()
  const [expandedAccordion, setExpandedAccordion] = useState<IPrograma | undefined>()
  const dataset = data?.data

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (dataset && dataset.length > 0) {
      setExpandedAccordion(dataset[0])
    }
  }, [data, dataset])

  return (
    <>
      {isDesktop ? (
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
      )}
    </>
  )
}
