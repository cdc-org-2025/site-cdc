import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (html?: string) => {
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
