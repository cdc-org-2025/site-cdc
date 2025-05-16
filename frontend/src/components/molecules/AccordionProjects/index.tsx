'use client'
import React, { useEffect, useState } from 'react'
import AccordionProjectsDesktop from './desktop'
import AccordionProjectsMobile from './mobile'
import { IPrograma, useProgramasListQuery } from '@/clients/api/programas'

export default function AccordionProjects() {
  const { data } = useProgramasListQuery()
  const [expandedAccordion, setExpandedAccordion] = useState<IPrograma | undefined>()

  useEffect(() => {
    if (data && data.length > 0) {
      setExpandedAccordion(data[0])
    }
  }, [data])

  return (
    <>
      <AccordionProjectsDesktop
        projectList={data}
        expandedAccordion={expandedAccordion}
        setExpandedAccordion={setExpandedAccordion}
      />
      <AccordionProjectsMobile
        projectList={data}
        expandedAccordion={expandedAccordion}
        setExpandedAccordion={setExpandedAccordion}
      />
    </>
  )
}
