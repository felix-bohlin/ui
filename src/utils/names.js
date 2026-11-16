// @ts-check
/**
 * @param {string} slug
 * @param {Map<string, string>} titles
 */
export function componentName(slug, titles) {
  const words = slug.replaceAll("-", " ")
  return titles.get(slug) ?? words.charAt(0).toUpperCase() + words.slice(1)
}

/** @param {string} source */
export const pageTitle = (source) =>
  source.match(/<Fragment\s+slot="title"\s*>(.*?)<\/Fragment\s*>/s)?.[1].trim()
