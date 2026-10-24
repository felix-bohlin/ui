// @ts-check
/** @typedef {import("./framework.js").FrameworkId} FrameworkId */

/** @typedef {"API" | "Blocks" | "Component" | "Guide" | "Learn"} SearchCategoryId */

/**
 * @typedef {object} SearchItem
 * @property {SearchCategoryId} category
 * @property {string} description
 * @property {FrameworkId} [frameworkId]
 * @property {string} headings
 * @property {string} id
 * @property {string} title
 * @property {string} [type]
 * @property {string} url
 */

/** @type {{ id: SearchCategoryId, label: string }[]} */
export const SEARCH_CATEGORIES = [
  { id: "API", label: "API" },
  { id: "Blocks", label: "Blocks" },
  { id: "Component", label: "Components" },
  { id: "Guide", label: "Guides" },
  { id: "Learn", label: "Learn" },
]
