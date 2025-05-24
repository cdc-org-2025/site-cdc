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

interface IWindowProps {
  width: number
  height: number
}

interface SettingsContextType {
  windowSize: IWindowProps
  theme: PaletteMode | undefined
  toggleTheme: () => void
  fontScale: number
  increaseFont: () => void
  decreaseFont: () => void
  resetFont: () => void
}

interface Props {
  children?: JSX.Element
}

export const SettingsContext = createContext({} as SettingsContextType)

export function SettingsProvider({ children }: Props) {
  const [windowSize, setWindowSize] = useState<IWindowProps>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const [theme, setTheme] = useState<PaletteMode | undefined>('light')
  const [fontScale, setFontScale] = useState<number>(1)

  // 🧠 Responsividade
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 🎨 Carrega tema e escala da fonte dos cookies
  useEffect(() => {
    const savedMode = Cookies.get('theme-default') as PaletteMode
    const savedScale = Cookies.get('font-scale')
    if (savedMode) setTheme(savedMode)
    if (savedScale) setFontScale(parseFloat(savedScale))
  }, [])

  // 🌗 Alterna entre light e dark
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newMode = prevTheme === 'light' ? 'dark' : 'light'
      Cookies.set('theme-default', newMode)
      return newMode
    })
  }, [])

  // 🔠 Fontes
  const increaseFont = useCallback(() => {
    setFontScale((prev) => {
      const next = Math.min(prev + 0.1, 2)
      Cookies.set('font-scale', next.toString())
      return next
    })
  }, [])

  const decreaseFont = useCallback(() => {
    setFontScale((prev) => {
      const next = Math.max(prev - 0.1, 0.7)
      Cookies.set('font-scale', next.toString())
      return next
    })
  }, [])

  const resetFont = useCallback(() => {
    Cookies.set('font-scale', '1')
    setFontScale(1)
  }, [])

  const contextValue = useMemo(
    () => ({
      windowSize,
      theme,
      toggleTheme,
      fontScale,
      increaseFont,
      decreaseFont,
      resetFont,
    }),
    [windowSize, theme, toggleTheme, fontScale, increaseFont, decreaseFont, resetFont]
  )

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}
