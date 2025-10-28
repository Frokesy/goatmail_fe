import sanitizeHtml from 'sanitize-html';

export function cleanMailHtml(rawHtml: string): string {
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'table']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'width', 'height', 'alt', 'style'],
      '*': ['style'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
  });
}
