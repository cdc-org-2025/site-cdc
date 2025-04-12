'use client'
import { PaletteMode } from '@mui/material'
import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  JSX,
} from 'react'
import Cookies from 'js-cookie'
import { useNavigation } from '@/hooks/useNavigation'

interface SettingsContextType {
  windowSize: IWindowProps
  theme: PaletteMode | undefined
  toggleTheme: () => void
  handleNavigate: (_?: string) => void
}

interface IWindowProps {
  width: number
  height: number
}

interface Props {
  children?: JSX.Element
}

export const SettingsContext = createContext({} as SettingsContextType)

export function SettingsProvider({ children }: Props) {
  const { handleNavigate } = useNavigation()

  const [windowSize, setWindowSize] = useState<IWindowProps>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const [theme, setTheme] = useState<PaletteMode | undefined>('light')

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const savedMode = Cookies.get('theme-default') as PaletteMode
    if (savedMode) {
      setTheme(savedMode)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newMode = prevTheme === 'light' ? 'dark' : 'light'
      Cookies.set('theme-default', newMode)
      return newMode
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      windowSize,
      theme,
      toggleTheme,
      handleNavigate,
    }),
    [windowSize, theme, handleNavigate, toggleTheme]
  )

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}
