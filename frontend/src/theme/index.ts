'use client'
import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

const getTheme = (mode: PaletteMode | undefined) =>
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
        // contrastText: mode === 'dark' ? '#' : '#',
      },
      secondary: {
        light: mode === 'dark' ? '#000' : '#fe9a03',
        main: mode === 'dark' ? '#000' : '#cb7a01',
        dark: mode === 'dark' ? '#fff' : '#000',
        // contrastText: mode === 'dark' ? '#' : '#',
      },
      text: {
        primary: mode === 'dark' ? '#000' : '#222',
        secondary: mode === 'dark' ? '#000' : '#727271',
      },
    },
    typography: {
      fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
      fontSize: 18,
      h1: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '2.67rem', // 48px
        fontWeight: 700,
      },
      h2: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '2.22rem', // 40px
        fontWeight: 700,
      },
      h3: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '1.94rem', // 35px
        fontWeight: 700,
      },
      h4: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '1.55rem', // 28px
        fontWeight: 700,
      },
      h5: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '1.28rem', // 23px
        fontWeight: 700,
      },
      overline: {
        fontSize: '1rem', //18px
      },
      body1: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '0.89rem', // 16px
        fontWeight: 500,
      },
      body2: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '0.78rem', // 14px
        fontWeight: 500,
      },
      subtitle1: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '0.89rem', // 16px
      },
      subtitle2: {
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif`,
        fontSize: '0.78rem', // 14px
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 834,
        lg: 1280,
        xl: 1920,
      },
    },
  })

export default getTheme
