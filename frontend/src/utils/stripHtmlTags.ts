import DOMPurify from 'dompurify'

export const sanitizeHtml = (html?: string): any => {
  if (html) {
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
        'data-*'
      ],
    })
  }
}