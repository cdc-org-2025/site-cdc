import React from 'react'
import { Lato } from 'next/font/google'
import Box from '@mui/material/Box';
import { sanitizeHtml } from '@/utils/scriptHtmlSanitize';

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
})

interface IVacancyDescription {
  description?: string
}

export default function VacancyDescription({ description }: IVacancyDescription) {
  if (!description) return null;

  return (
    <Box
      sx={{
        fontFamily: `${lato.style.fontFamily}, "Source Sans Pro", sans-serif !important`,
      }}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(description),
      }}
    />
  )
}
