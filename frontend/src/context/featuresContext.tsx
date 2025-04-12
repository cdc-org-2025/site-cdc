'use client'
import {
  createContext,
  useState,
  useMemo,
  useCallback,
  JSX,
  Dispatch,
  SetStateAction,
} from 'react'
import ImageDefaultAccordion from '../assets/accordion-projects/default.svg'
import {
  AccordionProjectsOption,
  IAccordionProjectsOption,
} from '@/constants/accordionProjectsOptions'

interface FeaturesContextType {
  expandedAccordion: IAccordionProjectsOption
  setExpandedAccordion: Dispatch<SetStateAction<IAccordionProjectsOption>>
  accordionProjectsOption: IAccordionProjectsOption[]
  setAccordionProjectsOption: Dispatch<
    SetStateAction<IAccordionProjectsOption[]>
  >
  handleExpandAccordionImage: (_: IAccordionProjectsOption) => void
  handleClickView: (_?: string) => Window | null
}

interface Props {
  children?: JSX.Element
}

export const FeaturesContext = createContext({} as FeaturesContextType)

export function FeaturesProvider({ children }: Props) {
  const [accordionProjectsOption, setAccordionProjectsOption] = useState<
    IAccordionProjectsOption[]
  >(AccordionProjectsOption)

  const [expandedAccordion, setExpandedAccordion] =
    useState<IAccordionProjectsOption>({
      id: 0,
      image: ImageDefaultAccordion.src,
    })

  const handleExpandAccordionImage = useCallback(
    (item: IAccordionProjectsOption) => {
      setExpandedAccordion((prev) =>
        prev?.id === item.id
          ? { id: 0, image: ImageDefaultAccordion.src }
          : item
      )
    },
    []
  )

  const handleClickView = useCallback(
    (link?: string) => window.open(link, '_blank'),
    []
  )

  const contextValue = useMemo(
    () => ({
      expandedAccordion,
      setExpandedAccordion,
      accordionProjectsOption,
      setAccordionProjectsOption,
      handleExpandAccordionImage,
      handleClickView,
    }),
    [
      expandedAccordion,
      accordionProjectsOption,
      handleExpandAccordionImage,
      handleClickView,
    ]
  )

  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  )
}
