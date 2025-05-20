'use client'
import {
  createContext,
  useMemo,
  JSX,
} from 'react'

interface FeaturesContextType {
}

interface Props {
  children?: JSX.Element
}

export const FeaturesContext = createContext({} as FeaturesContextType)

export function FeaturesProvider({ children }: Props) {

  const contextValue = useMemo(
    () => ({
    }),
    [
    ]
  )

  return (
    <FeaturesContext.Provider value={contextValue}>
      {children}
    </FeaturesContext.Provider>
  )
}
