'use client'
import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

const getTheme = (mode: PaletteMode | undefined, fontScale: number = 1) =>
  createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === 'dark' ? '#000' : '#f3f2ed',
        paper: mode === 'dark' ? '#000' : '#fff5e6',
      },
      primary: {
        light: mode === 'dark' ? '#000' : '#fff',
        main: mode === 'dark' ? '#000' : '#a7181d',
        dark: mode === 'dark' ? '#000' : '#992600',
      },
      secondary: {
        light: mode === 'dark' ? '#000' : '#fe9a03',
        main: mode === 'dark' ? '#000' : '#cb7a01',
        dark: mode === 'dark' ? '#fff' : '#000',
      },
      text: {
        primary: mode === 'dark' ? '#000' : '#222',
        secondary: mode === 'dark' ? '#000' : '#727271',
      },
    },
    typography: {
      fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
      fontSize: 18 * fontScale,
      h1: { fontSize: `${48 * fontScale}px`, fontWeight: 700 },
      h2: { fontSize: `${40 * fontScale}px`, fontWeight: 700 },
      h3: { fontSize: `${35 * fontScale}px`, fontWeight: 700 },
      h4: { fontSize: `${28 * fontScale}px`, fontWeight: 700 },
      h5: { fontSize: `${23 * fontScale}px`, fontWeight: 700 },
      body1: { fontSize: `${16 * fontScale}px`, fontWeight: 500 },
      body2: { fontSize: `${14 * fontScale}px`, fontWeight: 500 },
      subtitle1: { fontSize: `${16 * fontScale}px` },
      subtitle2: { fontSize: `${14 * fontScale}px` },
      overline: { fontSize: `${18 * fontScale}px` },
    },
    breakpoints: {
      values: { xs: 0, sm: 480, md: 834, lg: 1280, xl: 1920 },
    },
  });


export default getTheme
