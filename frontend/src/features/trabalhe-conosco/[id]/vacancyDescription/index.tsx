import { sanitizeHtml } from '@/utils/stripHtmlTags';
import React from 'react'

interface IVacancyDescription {
  description?: string
}

export default function VacancyDescription({ description }: IVacancyDescription) {
  if (!description) return null;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(description),
      }}
    />
  )
}
