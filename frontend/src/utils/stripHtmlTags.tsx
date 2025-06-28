'use client'

import { Box } from '@mui/material'
import DOMPurify from 'isomorphic-dompurify'
import { FC, useContext } from 'react'
import { Lato } from 'next/font/google'
import { SettingsContext } from '../context/settingsContext'

const lato = Lato({ subsets: ['latin'], weight: '400' })

type Props = {
  html?: string
  initialFontScale?: number
  initialFontWeightScale?: number
  indicadores?: boolean
}

const sanitizeHtml = (html?: string) => {
  if (!html) return ''
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'src',
      'style',
      'width',
      'height',
      'data-*',
    ],
  })
}

const SanitizedHtmlBox: FC<Props> = ({
  html,
  initialFontScale = 1,
  initialFontWeightScale = 1,
  indicadores = false,
}) => {
  const { fontScale, fontWeightScale } = useContext(SettingsContext)

  const finalFontSize = initialFontScale * fontScale
  const finalFontWeight = initialFontWeightScale * fontWeightScale * 400

  return (
    <Box
      sx={{
        fontSize: `${finalFontSize}rem !important`,
        fontWeight: `${finalFontWeight} !important`,
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
        '&, & *': {
          fontSize: `${finalFontSize}rem !important`,
          fontWeight: `${finalFontWeight} !important`,
          fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
        },
        ...(indicadores && {
          '& h1': {
            lineHeight: 1.2,
            fontWeight: '700 !important',
            letterSpacing: '0px',
            verticalAlign: 'middle',
            '&[style]': {
              fontSize: {
                xs: '28px !important',
                sm: '30px !important',
                md: '38px !important',
                lg: '48px !important',
              },
            },
          },
        }),
      }}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  )
}

export default SanitizedHtmlBox
