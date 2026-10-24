// @ts-check
import { navItems } from "./nav.js"

/** @typedef {import("./framework.js").FrameworkId} FrameworkId */
/** @typedef {import("./nav.js").SearchCategoryId} SearchCategoryId */

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

export const SEARCH_CATEGORIES = navItems.map(({ category, label }) => ({
  id: category,
  label,
}))
