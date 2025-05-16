'use client'
import React, { useEffect, useState } from 'react'
import AccordionProjectsDesktop from './desktop'
import AccordionProjectsMobile from './mobile'
import { IPrograma, useProgramasListQuery } from '@/clients/api/programas'
import { useMediaQuery, useTheme } from '@mui/material'

export default function AccordionProjects() {
  const { data } = useProgramasListQuery()
  const [expandedAccordion, setExpandedAccordion] = useState<IPrograma | undefined>()

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (data && data.length > 0) {
      setExpandedAccordion(data[0])
    }
  }, [data])

  return (
    <>
      {isDesktop ? (
        <AccordionProjectsDesktop
          projectList={data}
          expandedAccordion={expandedAccordion}
          setExpandedAccordion={setExpandedAccordion}
        />
      ) : (
        <AccordionProjectsMobile
          projectList={data}
          expandedAccordion={expandedAccordion}
          setExpandedAccordion={setExpandedAccordion}
        />
      )}
    </>
  )
}
