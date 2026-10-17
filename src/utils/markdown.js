/** @param {string} pathname */
export const markdownPath = (pathname) =>
  `${pathname.replace(/\/+$/, "") || "/index"}.md`
